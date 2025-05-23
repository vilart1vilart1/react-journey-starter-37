using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Customer.Swecon.Schultes.Database
{
  using System.Data;

  using Crm.Library.Data.MigratorDotNet.Framework;
  using Crm.Library.Data.MigratorDotNet.Migrator.Extensions;

  [Migration(20230409144300)]
  public class AddDisposedTubeSumToSmsServiceOrderDispatch : Migration
  {
    public override void Up()
    {
      Database.AddColumnIfNotExisting("[SMS].[ServiceOrderDispatch]", new Column("DisposedTubeSum", DbType.Int16, ColumnProperty.NotNull, defaultValue: 0));
    }
  }
}