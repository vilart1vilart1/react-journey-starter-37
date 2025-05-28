namespace Customer.Ramseier.Exchange
{
	using AutoMapper;
	using Crm;
	using Crm.Library.AutoFac;
	using Crm.Library.Helper;
	using Crm.Library.AutoMapper;
	using Crm.Model.Lookups;
	using Crm.VisitReport.Lookups;
	using Crm.VisitReport.Model;
	using Customer.Ramseier.Model.Extensions;
	using HtmlAgilityPack;
	using Integration.Exchange.Mapping;

	using Microsoft.Exchange.WebServices.Data;
	using System.IO;
	using System.Linq;

	using Integration.Exchange.Extensions;

	public class CustomVisitToTextConverter : VisitToTextConverter, IReplaceRegistration<VisitToTextConverter>
	{
		public override MessageBody Convert(Visit src, MessageBody dst, ResolutionContext ctx)
		{
			dst = dst ?? new MessageBody(string.Empty);
			dst.BodyType = BodyType.HTML;
			var document = new HtmlDocument();
			document.DocumentNode.AppendChild(HtmlNode.CreateNode("<html><head></head><body></body></html>"));
			var header = HtmlNode.CreateNode("<div></div>");
			header.Id = HeadId;
			var body = document.DocumentNode.SelectSingleNode("//body");
			body.AppendChild(header);
			if (src.ParentId.HasValue)
			{
				header.AppendChild(HtmlNode.CreateNode($"<div><strong>{ctx.GetLocalized("ParentName")}:&nbsp;</strong><span>{src.Parent?.Name}</span></div>"));
			}
			header.AppendChild(HtmlNode.CreateNode($"<div><strong>{ctx.GetLocalized("Address")}:&nbsp;</strong><span>{src.GetIcsLocation()}</span></div>"));
			if (string.IsNullOrWhiteSpace(src.ContactPerson) == false)
			{
				header.AppendChild(HtmlNode.CreateNode($"<div><strong>{ctx.GetLocalized("ContactPerson")}:&nbsp;</strong><span>{src.ContactPerson}</span></div>"));
			}
			if (src.ContactPersonRelationships.Any())
			{
				var node = HtmlNode.CreateNode($"<div><strong>{ctx.GetLocalized("ContactPersons")}:&nbsp;</strong><ul></ul></div>");
				header.AppendChild(node);
				var ul = node.SelectSingleNode("//ul");
				var items = src.ContactPersonRelationships.OrderBy(x => x.RelationshipTypeKey).ThenBy(x => x.Child.Surname);
				foreach (var item in items)
				{
					var html = $"<span>{ctx.Mapper.Map<string>(item.Child)}</span>";
					if (string.IsNullOrWhiteSpace(item.Child.DepartmentTypeKey) == false)
					{
						var department = item.Child.DepartmentTypeKey;
						if (ctx.GetService<IAppSettingsProvider>().GetValue(MainPlugin.Settings.Person.DepartmentIsLookup))
						{
							department = ctx.GetLocalized<DepartmentType>(item.Child.DepartmentTypeKey).Value;
						}
						html += $"&nbsp;-&nbsp;<span>{department}</span>";
					}
					if (string.IsNullOrWhiteSpace(item.Child.BusinessTitleKey) == false)
					{
						var businessTitle = item.Child.BusinessTitleKey;
						if (ctx.GetService<IAppSettingsProvider>().GetValue(MainPlugin.Settings.Person.BusinessTitleIsLookup))
						{
							businessTitle = ctx.GetLocalized<BusinessTitle>(item.Child.BusinessTitleKey).Value;
						}
						html += $"&nbsp;-&nbsp;<span>{businessTitle}</span>";
					}
					html += $"&nbsp;<span>({(string.IsNullOrWhiteSpace(item.Information) ? string.Empty : item.Information + ",")} {ctx.GetLocalized<ContactPersonRelationshipType>(item.RelationshipTypeKey)})</span>";
					ul.AppendChild(HtmlNode.CreateNode($"<li>{html}</li>"));
				}
			}
			if (src.VisitAimKey != null)
			{
				header.AppendChild(HtmlNode.CreateNode($"<div><strong>{ctx.GetLocalized("VisitAim")}:&nbsp;</strong><span>{ctx.GetLocalized<VisitAim>(src.VisitAimKey)}</span></div>"));
			}
			if (string.IsNullOrWhiteSpace(src.CustomAim) == false)
			{
				header.AppendChild(HtmlNode.CreateNode($"<div><strong>{ctx.GetLocalized("CustomAim")}:&nbsp;</strong><span>{src.CustomAim}</span></div>"));
			}
			if (string.IsNullOrWhiteSpace(src.BackgroundInfo) == false)
			{
				header.AppendChild(HtmlNode.CreateNode($"<div><strong>{ctx.GetLocalized("BackgroundInfo")}:&nbsp;</strong><p>{src.BackgroundInfo}</p></div>"));
			}
			var headerSeparator = HtmlNode.CreateNode("<hr/>");
			header.Id = HeadSeparatorId;
			body.AppendChild(headerSeparator);
			var count = 1;
			foreach (var visitTopic in src.Topics.OrderBy(x => x.Position).ThenByDescending(x => x.ModifyDate))
			{
				var container = HtmlNode.CreateNode("<div></div>");
				var topic = string.Empty;
				if (src.Topics.Count > 1)
				{
					topic += $"{count++}. ";
				}
				topic += visitTopic.Topic;
				container.AppendChild(HtmlNode.CreateNode($"<h1>{topic}</h1>"));
				container.AppendChild(HtmlNode.CreateNode($"<p>{visitTopic.Description}</p>"));
				body.AppendChild(container);
			}
			using (var writer = new StringWriter())
			{
				document.Save(writer);
				dst.Text = writer.ToString();
			}
			return dst;
		}
	}
}