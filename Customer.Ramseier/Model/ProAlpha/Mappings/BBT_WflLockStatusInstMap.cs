namespace Customer.Ramseier.Model.ProAlpha.Mappings
{
	using AutoMapper;

	using Customer.Ramseier.Model.ProAlpha.Entity;
	using Crm.Library.AutoMapper;
	using Crm.Library.Model;
	using Sms.ErpIntegration.ProAlphaBase;
	using Crm.Library.Helper;
	using System;

	public class BBT_WflLockStatusInstMap : IAutoMap
	{
		public void CreateMap(IProfileExpression Mapper)
		{
			Mapper.CreateMap<BBT_WflLockStatusInst, ContactStatus>()
				.ForMember(d => d.CreateDate, m => m.MapFrom(s => s.CreationDateTime))
				.ForMember(d => d.ModifyDate, m => m.MapFrom(s => s.ChangedDateTime))
				.ForMember(d => d.CreateUser, m => m.MapFrom(s => s.CreatedBy))
				.ForMember(d => d.ModifyUser, m => m.MapFrom(s => s.ChangedBy))
				.ForMember(d => d.Comment, m => m.MapFrom(s => s.Remark))
				.ForMember(d => d.LegacyId, m => m.MapFrom(s => s.BBM_WflLockStatus_ID))
				.ForMember(d => d.Description, m => m.MapFrom(s => s.LockStatusDescription))
				.ForMember(d => d.StatusTypeKey, m => m.MapFrom(s => s.LockStatusFunction))
				.AfterMap(
					(src, dest) =>
					{
						dest.ProAlphaObjectId = src.BBT_WflLockStatusInst_Obj;
						dest.ProAlphaLegacyId = src.Company;
					});
			Mapper.CreateMap<ContactStatus, BBT_WflLockStatusInst>()
			.ForMember(d => d.LmobileId, m => m.MapFrom(s => s.Id))
			.ForMember(d => d.BBT_WflLockStatusInst_Obj, m => m.MapFrom(s => s.ProAlphaObjectId))
			.ForMember(d => d.CreationDateTime, m => m.MapFrom(s => s.CreateDate))
			.ForMember(d => d.ChangedDateTime, m => m.MapFrom(s => s.ModifyDate))
			.ForMember(d => d.CreatedBy, m => m.MapFrom(s => s.CreateUser))
			.ForMember(d => d.ChangedBy, m => m.MapFrom(s => s.ModifyUser))
			.ForMember(d => d.Remark, m => m.MapFrom(s => s.Comment))
			.ForMember(d => d.BBM_WflLockStatus_ID, m => m.MapFrom(s => s.LegacyId))
			.ForMember(d => d.LockStatusDescription, m => m.MapFrom(s => s.Description))
			.ForMember(d => d.LockStatusFunction, m => m.MapFrom(s => s.StatusTypeKey))
            .ForMember(d => d.LimitedFrom, m => m.MapFrom(s => s.CreateDate))
            .ForMember(d => d.LimitedTo, m => m.MapFrom(s => s.CreateDate.AddDays(28)))
            .ForMember(d => d.Company, m => m.MapFrom((d, row, obj, context) => context.GetService<IAppSettingsProvider>().GetValue(ErpIntegrationProAlphaBasePlugin.Firma)));
		}
	}
}