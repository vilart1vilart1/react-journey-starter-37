using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Customer.Swecon.Schultes.Model.Extensions
{
  using Crm.Library.BaseModel;
  using Crm.Service.Model;

  public class ServiceOrderTimePostingExtension : EntityExtension<ServiceOrderTimePosting>
  {
    public Boolean IsOvertime { get; set; }
  }
}