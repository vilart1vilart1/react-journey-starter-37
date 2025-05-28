using Crm.Library.Data.MigratorDotNet.Framework;
using System;
using System.Data;

namespace Customer.Ramseier.Database
{
    [Migration(20230105115300)]
    public class AddColumnFileIdToCrmFileResource : Migration
    {
        public override void Up()
        {
            if (!Database.ColumnExists("[CRM].[FileResource]", "FileId"))
            {
                Database.AddColumn("[CRM].[FileResource]", new Column("FileId", DbType.Int32, ColumnProperty.Null));
            }
        }
    }
}