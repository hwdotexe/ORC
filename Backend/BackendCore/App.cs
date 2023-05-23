using System;
using System.IO;

namespace BackendCore
{
    public class App
    {
        public static readonly string wwwDir = $"{Directory.GetCurrentDirectory()}{Path.DirectorySeparatorChar}wwwroot";
        public static bool isDevelopment;
        public static string databaseName;
        private static State state;

        public static string DBConnectionString { get; private set; }
        public static string PasswordSalt { get; private set; }

        public static void Init(string connectionString, string passwordSalt, string database, bool isDev)
        {
            isDevelopment = isDev;
            DBConnectionString = connectionString;
            databaseName = database;
            PasswordSalt = passwordSalt;

            // Create default directories.
            if (!Directory.Exists(wwwDir))
            {
                Console.WriteLine("Creating www directory...");

                Directory.CreateDirectory(wwwDir);
            }
            else
            {
                Console.WriteLine("Loading www directory...");
            }

            state = new State();
        }

        /// <summary>
        /// Returns the State object of the application.
        /// </summary>
        /// <returns>A State object.</returns>
        public static State GetState()
        {
            return state;
        }
    }
}
