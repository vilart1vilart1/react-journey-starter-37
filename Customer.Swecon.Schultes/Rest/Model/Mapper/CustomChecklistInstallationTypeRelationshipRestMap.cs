using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Customer.Swecon.Schultes.Rest.Model.Mapper
{
	using AutoMapper;

	using Crm.Library.AutoMapper;

	using Customer.Swecon.Schultes.Model;

	public class CustomChecklistInstallationTypeRelationshipRestMap : IAutoMap
	{
		public void CreateMap()
		{
			Mapper.CreateMap<CustomChecklistInstallationTypeRelationship, CustomChecklistInstallationTypeRelationshipRest>()
				.ForMember(x => x.CustomInstallationType, m => m.Ignore())
				.ForMember(x => x.DynamicForm, m => m.Ignore());
		}
	}
}