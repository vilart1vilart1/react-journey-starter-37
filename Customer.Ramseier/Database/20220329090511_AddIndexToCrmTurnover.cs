namespace Customer.Ramseier.Database
{
	using Crm.Library.Data.MigratorDotNet.Framework;

	[Migration(20220329090511)]
	public class AddIndexToCrmTurnover : Migration
	{
		public override void Up()
		{
			Database.ExecuteNonQuery(@"
				IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('[CRM].[Turnover]') AND name = 'IX_Turnover_ContactKey_IsVolume_IsActive_I_CreateUser')
				BEGIN
					CREATE NONCLUSTERED INDEX IX_Turnover_ContactKey_IsVolume_IsActive_I_CreateUser
					ON [CRM].[Turnover] ([ContactKey],[IsVolume],[IsActive])
					INCLUDE ([CreateUser])
				END");
			}
		}
	}
