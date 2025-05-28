namespace Customer.Ramseier.Database
{
	using System.Data;

	using Crm.Library.Data.MigratorDotNet.Framework;

	[Migration(20210920080205)]
	public class AddIsComplainedToCrmErpDocument : Migration
	{
		public override void Up()
		{
			if (!Database.ColumnExists("Crm.ErpDocument", "IsComplained"))
			{
				Database.AddColumn("Crm.ErpDocument", new Column("IsComplained", DbType.Boolean, ColumnProperty.NotNull, false));
			}
		}
	}
}