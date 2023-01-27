using System;
using System.Collections.Generic;
using BackendCore.Authentication;
using BackendCore.Database;
using BackendCore.Models;

namespace BackendCore
{
    public class State
    {
        public List<Account> LoadedAccounts { get; }
        public Gatekeeper Auth { get; }
        public DBHandler DB { get; set; }

        public State()
        {
            Console.WriteLine("Loading State...");

            LoadedAccounts = new List<Account>();
            Auth = new Gatekeeper();
            DB = new DBHandler(App.databaseName);

            // Load items from DB into state here

            Console.WriteLine("State Loaded!");
        }
    }
}
