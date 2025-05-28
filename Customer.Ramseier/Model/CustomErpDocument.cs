namespace Customer.Ramseier.Model
{
    using Crm.ErpExtension.Model;
    using System;
    using System.ComponentModel;

    public class CustomErpDocument : ErpDocument
    {
        public virtual string DeliveryNoteNo { get; set; }
        public virtual DateTime? DeliveryNoteDate { get; set; }
        public virtual string InvoiceNo { get; set; }
        public virtual DateTime? InvoiceDate { get; set; }
        public virtual double? QuantityShipped { get; set; }
        public virtual DateTime? OrderConfirmationDate { get; set; }
        public virtual DateTime? DueDate { get; set; }
        public virtual string QuoteNo { get; set; }
        public virtual DateTime? QuoteDate { get; set; }
        public virtual DateTime? DocumentDate11 { get; set; }
        public virtual string OrderConfirmationNo { get; set; }
    }
}