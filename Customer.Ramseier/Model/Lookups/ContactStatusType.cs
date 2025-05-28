namespace Customer.Ramseier.Model.Lookups
{
	using Crm.Library.Globalization.Lookup;

	[Lookup("[LU].[ContactStatusType]")]
	[IgnoreMissingLookups]
	public class ContactStatusType : EntityLookup<string>
	{
	}
}