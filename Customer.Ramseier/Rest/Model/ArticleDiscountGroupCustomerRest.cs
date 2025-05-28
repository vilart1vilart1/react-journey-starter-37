namespace Customer.Ramseier.Model.Rest
{
	using Crm.Library.Rest;
	using System;

	[RestTypeFor(DomainType = typeof(ArticleDiscountGroupCustomer))]
	public class ArticleDiscountGroupCustomerRest : RestEntityWithExtensionValues
	{
		public Guid ContactKey { get; set; }
		public decimal Ds1 { get; set; }
		public decimal Ds2 { get; set; }
		public decimal Ds3 { get; set; }
		public DateTime ValidFrom { get; set; }
		public DateTime ValidTo { get; set; }
		public string Description { get; set; }
		public string PartDiscountGroupKey { get; set; }
		public virtual string ProAlphaObjectId { get; set; }
		public virtual string ProAlphaLegacyId { get; set; }
		public Guid ParentId { get; set; }
		public Guid ChildId { get; set; }
	}
}