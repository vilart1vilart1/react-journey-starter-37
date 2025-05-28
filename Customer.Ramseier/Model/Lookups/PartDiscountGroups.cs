namespace Customer.Ramseier.Model.Lookups
{
    using Crm.Library.Globalization.Lookup;

    [Lookup("[LU].[PartDiscountGroups]")]
    public class PartDiscountGroups : EntityLookup<string>
    {
      [LookupProperty(Shared = true)]
      public virtual decimal Ds1 { get; set; }
      [LookupProperty(Shared = true)]
      public virtual decimal Ds2 { get; set; }
      [LookupProperty(Shared = true)]
      public virtual decimal Ds3 { get; set; }
      [LookupProperty(Shared = true)]
      public virtual string LookupHeadProAlphaLegacyId { get; set; }
      [LookupProperty(Shared = true)]
      public virtual string LookupHeadProAlphaObjectId { get; set; }
      [LookupProperty(Shared = true)]
      public virtual string ProAlphaLegacyId { get; set; }
      [LookupProperty(Shared = true)]
      public virtual string ProAlphaObjectId { get; set; }
    }
}