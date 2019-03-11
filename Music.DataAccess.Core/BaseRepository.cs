using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading;
using Dapper;

namespace Music.DataAccess.Core
{
    public abstract class BaseRepository
    {
        public string ConnectionString = "Server=tcp:lemasterworks.database.windows.net,1433;Initial Catalog=MusicPlayer;Persist Security Info=False;User ID=tlemaster;Password=Lexielm2;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        private const int DefaultCommandTimeout = 30;

        protected SqlConnection GetConnection()
        {
            return new SqlConnection(ConnectionString);
        }

        protected CommandDefinition BuildStoredProcedure(string commandText, object parameters = null)
        {
            return new CommandDefinition(
                commandText: commandText,
                parameters: parameters,
                commandType: CommandType.StoredProcedure,
                commandTimeout: DefaultCommandTimeout,
                cancellationToken: default(CancellationToken)
             );
        }

        protected T Retrieve<T>(string storedProcedure, Func<SqlConnection, CommandDefinition, T> queryFunction)
        {
            return Retrieve(BuildStoredProcedure(storedProcedure), queryFunction);
        }

        protected T Retrieve<T>(string storedProcedure, object parameters, Func<SqlConnection, CommandDefinition, T> queryFunction)
        {
            return Retrieve(BuildStoredProcedure(storedProcedure, parameters), queryFunction);
        }

        protected T Retrieve<T>(CommandDefinition commandDefinition, Func<SqlConnection, CommandDefinition, T> queryFunction)
        {
            using (var connection = GetConnection())
            {
                try
                {
                    return queryFunction(connection, commandDefinition);
                }
                catch(Exception ex)
                {
                    throw;
                }
            }
        }

        protected void Execute(string storedProcedure, Action<SqlConnection, CommandDefinition> queryFunction)
        {
            Execute(BuildStoredProcedure(storedProcedure), queryFunction);
        }

        protected void Execute(string storedProcedure, object parameters, Action<SqlConnection, CommandDefinition> queryFunction)
        {
            Execute(BuildStoredProcedure(storedProcedure, parameters), queryFunction);
        }

        protected void Execute(CommandDefinition commandDefinition, Action<SqlConnection, CommandDefinition> queryFunction)
        {
            using (var connection = GetConnection())
            {
                try
                {
                    queryFunction(connection, commandDefinition);
                }
                catch(Exception ex)
                {
                    throw;
                }
            }
        }
    }
}
