namespace Customer.Ramseier.BackgroundServices
{
	using System;
	using System.Data;
	using System.Data.SqlClient;
	using System.Diagnostics;
	using System.IO;
	using System.Web.Hosting;

	using Crm.Library.BackgroundServices;
	using Crm.Library.Configuration;
	using Crm.Library.Data.NHibernateProvider;

	using log4net;

	using Quartz;

	[DisallowConcurrentExecution]
	public class ProvideSumUpTurnoverAgent : ManualSessionHandlingJobBase
	{
		private readonly IConnectionStringProvider connectionStringProvider;

		protected override void Run(IJobExecutionContext context)
		{
			try
			{
				Logger.Info($"{nameof(ProvideSumUpTurnoverAgent)} > Run: Background service started.");
				var totalWatch = Stopwatch.StartNew();

				Logger.Debug($"{nameof(ProvideSumUpTurnoverAgent)} > Run: Starting importing turnover sum up per customer {totalWatch.ElapsedMilliseconds} ms.");
				BeginTransaction();
				RunImportScript(HostingEnvironment.MapPath("~/Plugins/Customer.Ramseier/Integration/Import/I_Internal_TurnoverSumUpPerCustomer.sql"));
				EndTransaction();
				Logger.Info($"{nameof(ProvideSumUpTurnoverAgent)} > Finished import for turnover sum up per customer after {totalWatch.ElapsedMilliseconds} ms.");

				totalWatch.Stop();
			}
			catch (Exception ex)
			{
				Logger.Error("The import has failed: " + ex.Message, ex);
			}
		}
		private void RunImportScript(string scriptPath)
		{
			var importWatch = Stopwatch.StartNew();
			var connectionString = connectionStringProvider.DbConnectionString;
			using (var connection = new SqlConnection(connectionString))
			{
				try
				{
					connection.Open();
					var file = new FileInfo(scriptPath);
					var script = file.OpenText().ReadToEnd();
					var import = new SqlCommand(script, connection);
					import.ExecuteNonQuery();

					Logger.Debug($"RunImportScript: {scriptPath} executed - {importWatch.ElapsedMilliseconds} ms.");
				}
				catch (Exception ex)
				{
					Logger.Error($"RunImportScript: Ran on an error executing import script {scriptPath} after {importWatch.ElapsedMilliseconds} ms.\n\n{ex}");
				}
				finally
				{
					if (connection?.State != ConnectionState.Closed)
					{
						connection.Close();
					}
				}
			}
		}
		public ProvideSumUpTurnoverAgent(
			ISessionProvider sessionProvider,
			ILog logger,
			IConnectionStringProvider connectionStringProvider)
			: base(sessionProvider, logger)
		{
			this.connectionStringProvider = connectionStringProvider;
		}
	}
}