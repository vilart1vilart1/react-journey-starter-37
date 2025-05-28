namespace Customer.Ramseier.Model.Rest
{
	using Crm.Library.Api.Attributes;
	using Crm.Library.Rest;
	using System;

	[RestTypeFor(DomainType = typeof(ContactStatus))]
	public class ContactStatusRest : RestEntityWithExtensionValues
	{
		public Guid? ContactKey { get; set; }
		public string LegacyId { get; set; }
		public string Comment { get; set; }
		public string Description { get; set; }
		public string StatusTypeKey { get; set; }
		public virtual string ProAlphaObjectId { get; set; }
		public virtual string ProAlphaLegacyId { get; set; }
	}
}