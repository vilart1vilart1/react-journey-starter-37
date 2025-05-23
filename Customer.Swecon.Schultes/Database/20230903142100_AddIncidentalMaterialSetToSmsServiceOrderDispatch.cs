using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Customer.Swecon.Schultes.Database
{
  using System.Data;

  using Crm.Library.Data.MigratorDotNet.Framework;
  using Crm.Library.Data.MigratorDotNet.Migrator.Extensions;

  [Migration(20230903142100)]
  public class AddIncidentalMaterialSetToSmsServiceOrderDispatch : Migration
  {
    public override void Up()
    {
      Database.AddColumnIfNotExisting("[SMS].[ServiceOrderDispatch]", new Column("IncidentalMaterialSet", DbType.Boolean, ColumnProperty.NotNull, defaultValue: 0));
    }
  }
}