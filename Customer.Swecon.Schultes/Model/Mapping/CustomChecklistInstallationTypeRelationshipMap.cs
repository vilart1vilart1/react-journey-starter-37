namespace Customer.Swecon.Schultes.Model.Mapping
{
	using Crm.Library.BaseModel.Mappings;

	using NHibernate.Mapping.ByCode;

	public class CustomChecklistInstallationTypeRelationshipMap : EntityClassMapping<CustomChecklistInstallationTypeRelationship>
	{
		public CustomChecklistInstallationTypeRelationshipMap()
		{
			Schema("LU");
			Table("ChecklistInstallationType");

			Id(
				x => x.Id,
				map =>
				{
					map.Column("Id");
					map.Generator(Generators.Identity);
				});

			Property(x => x.InstallationTypeKey);
			Property(x => x.ChecklistId);
			Property(x => x.Description);
			Property(x => x.RequiredForServiceOrderCompletion);
			Property(x => x.SendToCustomer);

			ManyToOne(
				x => x.DynamicForm,
				m =>
				{
					m.Column("ChecklistId");
					m.Insert(false);
					m.Update(false);
					m.Fetch(FetchKind.Select);
					m.Lazy(LazyRelation.Proxy);
				});
		}
	}
}