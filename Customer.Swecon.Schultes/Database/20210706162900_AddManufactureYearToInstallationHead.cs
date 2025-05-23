using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Customer.Swecon.Schultes.Database
{
  using System.Data;

  using Crm.Library.Data.MigratorDotNet.Framework;
  using Crm.Library.Data.MigratorDotNet.Migrator.Extensions;

  [Migration(20210706162900)]
  public class AddManufactureYearToInstallationHead : Migration
  {
    public override void Up()
    {
      Database.AddColumnIfNotExisting("[SMS].[InstallationHead]", new Column("ManufactureYear", DbType.String, ColumnProperty.Null));
    }
  }
}