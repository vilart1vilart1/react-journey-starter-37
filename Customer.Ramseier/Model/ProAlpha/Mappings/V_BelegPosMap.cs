namespace Customer.Ramseier.Model.ProAlpha.Mappings
{
	using AutoMapper;

	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.Library.AutoMapper;

	public class V_BelegPosMap : IAutoMap
	{
		public void CreateMap(IProfileExpression Mapper)
		{
			Mapper.CreateMap<V_BelegPos, ErpDocumentArticleRelationship>()
				.AfterMap(
					(src, dest) =>
					{
						dest.ProAlphaObjectId = src.V_BelegPos_Obj;
						dest.ProAlphaLegacyId = src.V_BelegPos_Obj;
					});
		}
	}
}