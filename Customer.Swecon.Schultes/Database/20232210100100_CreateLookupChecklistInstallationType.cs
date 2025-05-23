namespace Customer.Swecon.Schultes.Database
{
	using System;
	using System.Data;

	using Crm.Library.Data.MigratorDotNet.Framework;
	using Crm.Library.Extensions;

	[Migration(20232210100100)]
	public class CreateLookupChecklistInstallationType : Migration
	{
		public override void Up()
		{
			if (!Database.TableExists("[Lu].[ChecklistInstallationType]"))
			{
				Database.AddTable("[Lu].[ChecklistInstallationType]",
					new Column("Id", DbType.Int32, ColumnProperty.PrimaryKeyWithIdentity),
					new Column("ChecklistId", DbType.Int32, ColumnProperty.NotNull),
					new Column("InstallationTypeKey", DbType.String, 50, ColumnProperty.NotNull),
					new Column("RequiredForServiceOrderCompletion", DbType.Boolean, ColumnProperty.NotNull, false),
					new Column("SendToCustomer", DbType.Boolean, ColumnProperty.NotNull, false),
					new Column("CreateDate", DbType.DateTime, ColumnProperty.NotNull, DateTime.UtcNow.ToIsoDateString()),
					new Column("CreateUser", DbType.String, 50, ColumnProperty.NotNull),
					new Column("ModifyDate", DbType.DateTime, ColumnProperty.NotNull, DateTime.UtcNow.ToIsoDateString()),
					new Column("ModifyUser", DbType.String, 50, ColumnProperty.NotNull),
					new Column("IsActive", DbType.Boolean, ColumnProperty.NotNull, true),
					new Column("Description", DbType.String, ColumnProperty.Null),
					new Column("TenantKey", DbType.Int32, ColumnProperty.Null));
			}
		}
	}
}