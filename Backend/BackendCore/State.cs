﻿using System;
using System.Collections.Generic;
using BackendCore.Authentication;
using BackendCore.Database;
using BackendCore.Models;
using BackendCore.Models.GameSystem;

namespace BackendCore
{
    public class State
    {
        public List<Account> LoadedAccounts { get; }
        public List<GameSystem> LoadedSystems { get; }
        public List<Character> LoadedCharacters { get; set; }
        public List<Campaign> LoadedCampaigns { get; set; }
        public Gatekeeper Auth { get; }
        public DBHandler DB { get; set; }

        public State()
        {
            Console.WriteLine("Loading State...");

            LoadedAccounts = new List<Account>();
            LoadedSystems = new List<GameSystem>();
            LoadedCharacters = new List<Character>();
            LoadedCampaigns = new List<Campaign>();

            Auth = new Gatekeeper();
            DB = new DBHandler(App.databaseName);

            // Load sitewide items from DB into state here.

            Console.WriteLine("State Loaded!");
        }

        public void LoadAccount(Account account)
        {
            // TODO: put into memory, call mapping functions, load user assets.
            // TODO: unload these later?
            LoadedAccounts.Add(account);

            var userSystems = DB.GetSystems(account.AccountID);
            var userCharacters = DB.GetCharacters(account.AccountID);
            var userCampaigns = DB.GetCampaigns(account.AccountID);

            if (userSystems != null)
            {
                LoadedSystems.AddRange(userSystems);
            }

            if (userCharacters != null)
            {
                LoadedCharacters.AddRange(userCharacters);
            }

            // TODO: potential collision if User A and User B both load the same campaign.
            // Keep the original in memory, as it has potential to have been modified.
            if (userCampaigns != null)
            {
                LoadedCampaigns.AddRange(userCampaigns);
            }
        }
    }
}
