namespace Customer.Swecon.Schultes.Model.Mapping
{
	using Crm.Library.BaseModel.Interfaces;
	using Crm.Library.BaseModel.Mappings;

	using Customer.Swecon.Schultes.Model.Extensions;

	using Model;

	public class CustomInstallationTypeMap : EntityClassMapping<CustomInstallationType>
	{
		public CustomInstallationTypeMap()
		{
			Schema("CRM");
			Table("CustomInstallationType");
			Id(x => x.Id, map => { map.Column("CustomInstallationTypeId"); });
			Property(x => x.Description);

		}
	}
}