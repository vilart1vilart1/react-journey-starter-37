namespace Customer.Ramseier.Rest.Model
{
    using Crm.ErpExtension.Rest.Model;
    using Crm.Library.Api.Attributes;
    using Crm.Library.Rest;
    using Customer.Ramseier.Model;
    using System;

    [RestrictedType]
    [RestTypeFor(DomainType = typeof(CustomErpDocument))]
    public class CustomErpDocumentRest : ErpDocumentRest
    {
        public string DeliveryNoteNo { get; set; }
        public DateTime? DeliveryNoteDate { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public double? QuantityShipped { get; set; }
        public DateTime? OrderConfirmationDate { get; set; }
        public DateTime? DueDate { get; set; }
        public string QuoteNo { get; set; }
        public DateTime? QuoteDate { get; set; }
        public DateTime? DocumentDate11 { get; set; }
        public string OrderConfirmationNo { get; set; }
    }
}