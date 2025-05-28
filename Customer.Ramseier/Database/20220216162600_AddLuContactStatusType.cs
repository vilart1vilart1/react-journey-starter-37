using Crm.Library.Data.MigratorDotNet.Framework;
using System.Data;

namespace Customer.Ramseier.Database
{
	[Migration(20220216162600)]
	public class AddLuContactStatusType : Migration
	{
		public override void Up()
		{
			const string tableName = "[LU].[ContactStatusType]";
			if (Database.TableExists(tableName))
			{
				return;
			}
			Database.AddTable(tableName,
				new Column("ContactStatusTypeId", DbType.Int16, ColumnProperty.Identity),
				new Column("Name", DbType.String, 20, ColumnProperty.NotNull),
				new Column("Language", DbType.StringFixedLength, 2, ColumnProperty.NotNull),
				new Column("Favorite", DbType.Boolean, ColumnProperty.NotNull, false),
				new Column("SortOrder", DbType.Int16, ColumnProperty.Null),
				new Column("Value", DbType.String, 30, ColumnProperty.NotNull),
				new Column("CreateDate", DbType.DateTime, ColumnProperty.NotNull),
				new Column("ModifyDate", DbType.DateTime, ColumnProperty.NotNull),
				new Column("CreateUser", DbType.String, 256, ColumnProperty.NotNull),
				new Column("ModifyUser", DbType.String, 256, ColumnProperty.NotNull),
				new Column("IsActive", DbType.Boolean, ColumnProperty.NotNull, true)
			);
		}
		public override void Down()
		{

		}
	}
}