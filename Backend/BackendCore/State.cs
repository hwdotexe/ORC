using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
        public List<Page> CachedPages { get; set; }
        public Gatekeeper Auth { get; }
        public DBHandler DB { get; set; }

        public State()
        {
            Console.WriteLine("Loading State...");

            LoadedAccounts = new List<Account>();
            LoadedSystems = new List<GameSystem>();
            LoadedCharacters = new List<Character>();
            LoadedCampaigns = new List<Campaign>();
            CachedPages = new List<Page>();

            Auth = new Gatekeeper();
            DB = new DBHandler(App.databaseName);

            // Load sitewide items from DB into state here.

            Console.WriteLine("State Loaded!");
        }

        public void LoadAccount(Account account)
        {
            // TODO: unload these later?
            LoadedAccounts.Add(account);

            Parallel.Invoke(
                () => LoadUserSystems(account.AccountID),
                () => LoadUserCharacters(account.AccountID),
                () => LoadUserCampaigns(account.AccountID));
        }

        private void LoadUserSystems(Guid accountID)
        {
            var userSystems = DB.GetSystems(accountID);

            if (userSystems != null)
            {
                userSystems.ForEach(s =>
                {
                    if (!LoadedSystems.Exists(ls => ls.SystemID == s.SystemID))
                    {
                        LoadedSystems.Add(s);
                    }
                });
            }
        }

        private void LoadUserCharacters(Guid accountID)
        {
            var userCharacters = DB.GetCharacters(accountID);

            if (userCharacters != null)
            {
                userCharacters.ForEach(c =>
                {
                    if (!LoadedCharacters.Exists(lc => lc.CharacterID == c.CharacterID))
                    {
                        LoadedCharacters.Add(c);
                    }
                });
            }
        }

        private void LoadUserCampaigns(Guid accountID)
        {
            var userCampaigns = DB.GetCampaigns(accountID);

            if (userCampaigns != null)
            {
                userCampaigns.ForEach(c =>
                {
                    if (!LoadedCampaigns.Exists(lc => lc.CampaignID == c.CampaignID))
                    {
                        LoadedCampaigns.Add(c);
                    }
                });
            }
        }
    }
}