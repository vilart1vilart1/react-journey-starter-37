using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Customer.Swecon.Schultes.Database
{
  using System.Data;

  using Crm.Library.Data.MigratorDotNet.Framework;
  using Crm.Library.Data.MigratorDotNet.Migrator.Extensions;

  [Migration(20220217112300)]
  public class AddIsCompletedToSmsServiceOrderMaterial : Migration
  {
    public override void Up()
    {
      Database.AddColumnIfNotExisting("[SMS].[ServiceOrderMaterial]", new Column("IsCompleted", DbType.Boolean, ColumnProperty.Null, defaultValue:false));
    }
  }
}