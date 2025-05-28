namespace Customer.Ramseier.Model.Extensions
{
	using Crm.Library.Extensions;
	using Crm.VisitReport.Model;

	using AddressExtension = Crm.ErpIntegration.ProAlphaBase.Model.Extensions.AddressExtension;

	public static class VisitExtension
	{
		public static string GetVisitAim(this Visit visit)
		{
			var visitAim = visit.CustomAim;
			if (visit.VisitAimKey.IsNotNullOrEmpty() && visit.VisitAim != null)
			{
				visitAim = visit.VisitAim.Value;
			}

			return visitAim;
		}
		public static string GetIcsSummary(this Visit visit)
		{
			var summary = visit.GetVisitAim() + " (" + visit.ResponsibleUserObject.DisplayName + ")";

			return summary;
		}
		public static string GetIcsDescription(this Visit visit)
		{
			var description = "";
			description += visit.ResourceManager.GetTranslation("VisitAim") + ": ";
			description += visit.GetVisitAim() + "\\n";
			if (visit.ParentName.IsNotNullOrEmpty())
			{
				description += visit.ResourceManager.GetTranslation("ContactName") + ": ";
				description += visit.ParentName + "\\n";
			}

			if (visit.ResponsibleUser.IsNotNullOrEmpty() && visit.ResponsibleUserObject != null)
			{
				description += visit.ResourceManager.GetTranslation("ResponsibleUser") + ": ";
				description += visit.ResponsibleUserObject.DisplayName;
			}

			return description;
		}
		public static string GetIcsLocation(this Visit visit)
		{
			var address = visit.Address;
			var location = "";

			if (address == null)
			{
				return location;
			}

			var addressExtensions = address.GetExtension<AddressExtension>();
			if (address.Name1.IsNotNullOrEmpty())
			{
				location += address.Name1 + ", ";
			}

			if (address.Name2.IsNotNullOrEmpty())
			{
				location += address.Name2 + ", ";
			}

			if (address.Name3.IsNotNullOrEmpty())
			{
				location += address.Name3 + ", ";
			}

			if (addressExtensions.HouseNo.IsNotNullOrEmpty())
			{
				location += address.Street + " " + addressExtensions.HouseNo + ", ";
			}
			else
			{
				location += address.Street + ", ";
			}

			location += address.ZipCode + " " + address.City + ", ";

			if (address.Region != null)
			{
				location += address.Region.Value + ", ";
			}

			if (address.Country != null)
			{
				location += address.Country.Value;
			}

			return location;
		}
	}
}