namespace Customer.Ramseier.Model.ProAlpha.Entity
{
    using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity.Base;

    public class QL_TurnoverValues : HeadEntityBase
    {
        public virtual int? Year { get; set; }
        public virtual bool? IsVolume { get; set; }
        public virtual decimal? Month1 { get; set; }
        public virtual decimal? Month2 { get; set; }
        public virtual decimal? Month3 { get; set; }
        public virtual decimal? Month4 { get; set; }
        public virtual decimal? Month5 { get; set; }
        public virtual decimal? Month6 { get; set; }
        public virtual decimal? Month7 { get; set; }
        public virtual decimal? Month8 { get; set; }
        public virtual decimal? Month9 { get; set; }
        public virtual decimal? Month10 { get; set; }
        public virtual decimal? Month11 { get; set; }
        public virtual decimal? Month12 { get; set; }
        public virtual decimal? Total { get; set; }
    }
}