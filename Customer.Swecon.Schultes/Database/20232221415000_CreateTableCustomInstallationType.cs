

namespace Customer.Swecon.Schultes.Database
{
	using System;
	using System.Data;

	using Crm.Library.Data.MigratorDotNet.Framework;
	using Crm.Library.Extensions;

	[Migration(20232221415000)]
  public class CreateTableCustomInstallationType : Migration
  {
	  public override void Up()
	  {
		  if (!Database.TableExists("[Crm].[CustomInstallationType]"))
		  {
			  Database.AddTable(
				  "[Crm].[CustomInstallationType]",
				  new Column("CustomInstallationTypeId", DbType.Int32, ColumnProperty.PrimaryKeyWithIdentity),
				  new Column("Description", DbType.String, ColumnProperty.NotNull),
				  new Column("LegacyId", DbType.String, ColumnProperty.NotNull),
				  new Column("CreateDate", DbType.DateTime, ColumnProperty.NotNull),
				  new Column("CreateUser", DbType.String, 256, ColumnProperty.NotNull),
				  new Column("ModifyDate", DbType.DateTime, ColumnProperty.NotNull),
				  new Column("ModifyUser", DbType.String, 256, ColumnProperty.NotNull),
				  new Column("IsActive", DbType.Boolean, ColumnProperty.NotNull, true),
				  new Column("TenantKey", DbType.Int32, ColumnProperty.Null, null)
			  );
		  }
	  }
  }
}