
namespace Customer.Swecon.Schultes.Model
{
  using Crm.Library.BaseModel;
  using Crm.Library.BaseModel.Interfaces;


  public class CustomInstallationType : EntityBase<int>, ISoftDelete
  {
	  public virtual string Description { get; set; }
	  //public virtual int BranchId { get; set; }
  }
}