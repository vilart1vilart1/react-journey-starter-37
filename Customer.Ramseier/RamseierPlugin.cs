namespace Customer.Ramseier
{
	using Crm.Library.Configuration;
	using Crm.Library.Modularization;

	[Plugin(Requires = "Crm.VisitReport,Crm.ErpIntegration.ProAlphaBase,Crm.Offline,Crm.ErpExtension")]
	public class RamseierPlugin : CustomerPlugin
	{
		public static readonly string PluginName = typeof(RamseierPlugin).Namespace;

		public static class PermissionGroup
		{
			public const string Turnover = "ErpTurnover";
			public const string CustomErpDocument = "CustomErpDocument";
			public const string ErpDocumentArticleRelationship = "ErpDocumentArticleRelationship";
			public const string ArticleDiscountGroupCustomer = "ArticleDiscountGroupCustomer";
		}

		public static class Settings
		{
			public static SettingDefinition<float> TurnoverDifferenceMinimum => new SettingDefinition<float>("Turnover/Difference/Minimum", PluginName);
			public static SettingDefinition<float> TurnoverDifferenceMaximum => new SettingDefinition<float>("Turnover/Difference/Maximum", PluginName);
			public static SettingDefinition<float> TurnoverDifferenceSteps => new SettingDefinition<float>("Turnover/Difference/Steps", PluginName);
			public static SettingDefinition<string> ContactStatusLegacyId => new SettingDefinition<string>("ContactStatus/LegacyId", PluginName);
			public static class ProAlpha
			{
				public static class MessageType
				{
					public static SettingDefinition<string> ContactStatusDataSet => new SettingDefinition<string>("ProAlpha/MessageType/ContactStatusDataSet", PluginName);
					public static SettingDefinition<string> CustomerDiscountGroupsDataSet => new SettingDefinition<string>("ProAlpha/MessageType/CustomerDiscountGroupsDataSet", PluginName);
					public static SettingDefinition<string> PartDiscountGroupsDataSet => new SettingDefinition<string>("ProAlpha/MessageType/PartDiscountGroupsDataSet", PluginName);
                    public static SettingDefinition<string> TurnoverDataSet => new SettingDefinition<string>("ProAlpha/MessageType/TurnoverDataSet", PluginName);

                }
            }
            public static SettingDefinition<string> Firma => new SettingDefinition<string>("ProAlpha/Firma", PluginName);
            public static class Connection
            {
                public static SettingDefinition<string> Server => new SettingDefinition<string>("ProAlpha/Connection/Server", PluginName);
                public static SettingDefinition<string> Port => new SettingDefinition<string>("ProAlpha/Connection/Port", PluginName);
                public static SettingDefinition<string> User => new SettingDefinition<string>("ProAlpha/Connection/User", PluginName);
                public static SettingDefinition<string> Password => new SettingDefinition<string>("ProAlpha/Connection/Password", PluginName);
                public static SettingDefinition<string> Webservice => new SettingDefinition<string>("ProAlpha/Connection/Webservice", PluginName);
                public static SettingDefinition<bool> UseNameServer => new SettingDefinition<bool>("ProAlpha/Connection/UseNameServer", PluginName);
                public static SettingDefinition<string> AppServerKeepalive => new SettingDefinition<string>("ProAlpha/Connection/AppServerKeepalive", PluginName);
            }
        }
	}
}