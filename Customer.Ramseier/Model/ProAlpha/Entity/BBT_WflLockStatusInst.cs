namespace Customer.Ramseier.Model.ProAlpha.Entity
{
	using System;

	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity.Base;

	public class BBT_WflLockStatusInst : HeadEntityBase
	{
		public string BBT_WflLockStatusInst_Obj { get; set; }
		public string BBM_WflLockStatus_Obj { get; set; }
		public string ChangedBy { get; set; }
		public DateTime? ChangedDateTime { get; set; }
		public string CreatedBy { get; set; }
		public DateTime? CreationDateTime { get; set; }
		public string Owning_Obj { get; set; }
		public string Remark { get; set; }
		public DateTime? LimitedFrom { get; set; }
		public DateTime? LimitedTo { get; set; }
		public string BBT_WflBPInstHead_Obj { get; set; }
		public string BBM_WflLockStatus_ID { get; set; }
		public string BB_Bereich_Obj { get; set; }
		public string Company { get; set; }
		public string Customer { get; set; }
		public string LockStatusDescription { get; set; }
		public string LockStatusFunction { get; set; }


	}
}