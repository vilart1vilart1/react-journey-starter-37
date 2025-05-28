namespace Customer.Ramseier.Database
{
	using Crm.Library.Data.MigratorDotNet.Framework;
	using System;
	using System.Text;

	[Migration(20220218084700)]
	public class AddTableCrmContactStatus : Migration
	{
		public override void Up()
		{
			if (!Database.TableExists("[CRM].[ContactStatus]"))
			{
				var stringBuilder = new StringBuilder();
				stringBuilder.AppendLine("CREATE TABLE [CRM].[ContactStatus](");
				stringBuilder.AppendLine("[ContactStatusId] [uniqueidentifier] NOT NULL,");
				stringBuilder.AppendLine("[ContactKey] [uniqueidentifier] NOT NULL,");
				stringBuilder.AppendLine("[StatusTypeKey] [nvarchar](20) NOT NULL,");
				stringBuilder.AppendLine("[LegacyId] [nvarchar](50) NOT NULL,");
				stringBuilder.AppendLine("[Comment] [nvarchar](500) NULL,");
				stringBuilder.AppendLine("[Description] [nvarchar](256) NOT NULL,");
				stringBuilder.AppendLine("[IsActive] [bit] NOT NULL,");
				stringBuilder.AppendLine("[CreateDate] [datetime] NOT NULL,");
				stringBuilder.AppendLine("[CreateUser] [nvarchar](60) NOT NULL,");
				stringBuilder.AppendLine("[ModifyDate] [datetime] NOT NULL,");
				stringBuilder.AppendLine("[ModifyUser] [nvarchar](60) NOT NULL,");
				stringBuilder.AppendLine("CONSTRAINT [PK_ContactStatus] PRIMARY KEY CLUSTERED ");
				stringBuilder.AppendLine("(");
				stringBuilder.AppendLine("[ContactStatusId] ASC");
				stringBuilder.AppendLine(
					")WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]");
				stringBuilder.AppendLine(") ON [PRIMARY]");
				Database.ExecuteNonQuery(stringBuilder.ToString());
				//Database.ExecuteNonQuery(
				//    @"ALTER TABLE [SMS].[ServiceHeaderAlarmCode] WITH CHECK ADD CONSTRAINT [FK_ServiceHeaderAlarmCode_ServiceOrderHead] FOREIGN KEY ([OrderId]) REFERENCES [CRM].[Contact] ([ContactId])
				//");

				//Database.ExecuteNonQuery(
				//    @"ALTER TABLE [SMS].[ServiceHeaderAlarmCode] WITH CHECK ADD CONSTRAINT [FK_ServiceHeaderAlarmCode_AlarmCode] FOREIGN KEY ([AlarmCodeKey])REFERENCES [LU].[AlarmCodes] ([AlarmCodesId])
				//");
			}
		}
		public override void Down()
		{
			throw new NotImplementedException();
		}
	}
}