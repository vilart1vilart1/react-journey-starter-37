namespace Customer.Ramseier.Model
{
	using Crm.Library.BaseModel;
	using Crm.Library.BaseModel.Attributes;
	using Crm.Library.BaseModel.Interfaces;
	using Customer.Ramseier.Model.Lookups;
	using System;


	public class ContactStatus : EntityBase<Guid>, ISoftDelete
	{
		public virtual string LegacyId { get; set; }
		public virtual Guid? ContactKey { get; set; }
		public virtual string Comment { get; set; }
		public virtual string Description { get; set; }
		public virtual string StatusTypeKey { get; set; }
		public virtual bool IsExported { get; set; }
		[Obsolete("Use ILookupManager instance to retrieve value at calling method", false)]
		public virtual ContactStatusType Type
		{
			get { return StatusTypeKey != null ? LookupManager.Get<ContactStatusType>(StatusTypeKey) : null; }
		}
		[UI(Hidden = true)]
		public virtual string ProAlphaLegacyId { get; set; }

		[UI(Hidden = true)]
		public virtual string ProAlphaObjectId { get; set; }
	}
}