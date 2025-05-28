namespace Customer.Ramseier.Model.Maps
{
	using Crm.Library.BaseModel.Mappings;
	using System;

	public class ContactStatusMap : EntityClassMapping<ContactStatus>
	{
		public ContactStatusMap()
		{
			Schema("CRM");
			Table("ContactStatus");

			Id(a => a.Id, m =>
			{
				m.Column("ContactStatusId");
				m.Generator(LMobile.Unicore.NHibernate.GuidCombGeneratorDef.Instance);
				m.UnsavedValue(Guid.Empty);
			});

			Property(x => x.ContactKey);
			Property(x => x.LegacyId);
			Property(x => x.Comment);
			Property(x => x.Description);
			Property(x => x.StatusTypeKey);
			Property(x => x.ProAlphaLegacyId);
			Property(x => x.ProAlphaObjectId);
			Property(x => x.IsExported);
		}
	}
}