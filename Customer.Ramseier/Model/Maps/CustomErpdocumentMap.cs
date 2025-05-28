namespace Customer.Ramseier.Model.Maps
{
	using Crm.Library.BaseModel.Interfaces;
	using Crm.Library.BaseModel.Mappings;
	using NHibernate.Mapping.ByCode;
	using NHibernate.Mapping.ByCode.Conformist;
	using System;

	public class CustomErpdocumentMap : SubclassMapping<CustomErpDocument>, IDatabaseMapping
	{
    public CustomErpdocumentMap()
    {
			DiscriminatorValue("not null");
			Property(x => x.DeliveryNoteNo, map => map.Column("DeliverNoteNo"));
			Property(x => x.DeliveryNoteDate);
			Property(x => x.InvoiceNo);
			Property(x => x.InvoiceDate);
			Property(x => x.QuantityShipped);
			Property(x => x.OrderConfirmationDate);
			Property(x => x.DueDate);
			Property(x => x.QuoteNo);
			Property(x => x.QuoteDate);
			Property(x => x.DocumentDate11);
			Property(x => x.OrderConfirmationNo);
		}
	}
}