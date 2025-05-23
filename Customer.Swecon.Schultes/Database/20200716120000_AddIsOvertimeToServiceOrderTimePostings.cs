using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Customer.Swecon.Schultes.Database
{
  using System.Data;

  using Crm.Library.Data.MigratorDotNet.Framework;

  [Migration(20200716140000)]
  public class AddIsOvertimeToServiceOrderTimePostings : Migration
  {
    public override void Up()
    {
      if (!Database.ColumnExists("[SMS].[ServiceOrderTimePostings]", "IsOvertime"))
      {
        Database.AddColumn("[SMS].[ServiceOrderTimePostings]", "IsOvertime", DbType.Boolean, false);
      }
    }
  }
}