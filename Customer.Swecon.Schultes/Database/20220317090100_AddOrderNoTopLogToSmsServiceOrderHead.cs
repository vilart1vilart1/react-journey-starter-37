using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Customer.Swecon.Schultes.Database
{
  using System.Data;

  using Crm.Library.Data.MigratorDotNet.Framework;
  using Crm.Library.Data.MigratorDotNet.Migrator.Extensions;

  [Migration(20220317090100)]
  public class AddOrderNoTopLogToSmsServiceOrderHead : Migration
  {
    public override void Up()
    {
      Database.AddColumnIfNotExisting("[SMS].[ServiceOrderHead]", new Column("OrderNoTopLog", DbType.String, ColumnProperty.Null));
    }
  }
}