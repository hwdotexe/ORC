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
        public List<PageFolder> LoadedPageFolders { get; set; }
        public Gatekeeper Auth { get; }
        public DBHandler DB { get; set; }

        private List<Page> CachedPages { get; set; }

        public State()
        {
            Console.WriteLine("Loading State...");

            LoadedAccounts = new List<Account>();
            LoadedSystems = new List<GameSystem>();
            LoadedCharacters = new List<Character>();
            LoadedCampaigns = new List<Campaign>();
            LoadedPageFolders = new List<PageFolder>();
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
                () => LoadUserCampaigns(account.AccountID),
                () => LoadUserPageFolders(account.AccountID));
        }

        public Page GetPage(Guid pageID)
        {
            var cachedPage = CachedPages.Find(p => p.PageID == pageID);

            if (cachedPage != null)
            {
                return cachedPage;
            }
            else
            {
                var pageFromDB = App.GetState().DB.GetPage(pageID);

                if (pageFromDB != null)
                {
                    App.GetState().CachedPages.Add(pageFromDB);
                }

                return pageFromDB;
            }
        }

        public List<Page> GetPages(List<Guid> pageIDs)
        {
            if (pageIDs.Count > 0)
            {
                var cachedPages = CachedPages.FindAll(p => pageIDs.Contains(p.PageID));
                var notCachedPages = pageIDs.FindAll(id => !CachedPages.Exists(p => p.PageID == id));

                if (cachedPages.Count > 0 && notCachedPages.Count == 0)
                {
                    return cachedPages;
                }
                else
                {
                    var pagesFromDB = App.GetState().DB.GetPages(notCachedPages);

                    if (pagesFromDB != null)
                    {
                        App.GetState().CachedPages.AddRange(pagesFromDB);
                        cachedPages.AddRange(pagesFromDB);
                    }

                    return cachedPages;
                }
            }
            else
            {
                return new List<Page>();
            }
        }

        public void DeletePage(Guid pageID)
        {
            
            var cachedPage = CachedPages.Find(p => p.PageID == pageID);

            if (cachedPage != null)
            {
                CachedPages.Remove(cachedPage);
            }

            App.GetState().DB.DeletePage(pageID);
        }

        // TODO: This is not implemented.
        public List<Page> DeletePages(List<Guid> pageIDs)
        {
            if (pageIDs.Count > 0)
            {
                var cachedPages = CachedPages.FindAll(p => pageIDs.Contains(p.PageID));
                var notCachedPages = pageIDs.FindAll(id => !CachedPages.Exists(p => p.PageID == id));

                if (cachedPages.Count > 0 && notCachedPages.Count == 0)
                {
                    return cachedPages;
                }
                else
                {
                    var pagesFromDB = App.GetState().DB.GetPages(notCachedPages);

                    if (pagesFromDB != null)
                    {
                        App.GetState().CachedPages.AddRange(pagesFromDB);
                        cachedPages.AddRange(pagesFromDB);
                    }

                    return cachedPages;
                }
            }
            else
            {
                return new List<Page>();
            }
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

        private void LoadUserPageFolders(Guid accountID)
        {
            var userPageFolders = DB.GetPageFolders(accountID);

            if (userPageFolders != null)
            {
                userPageFolders.ForEach(c =>
                {
                    if (!LoadedPageFolders.Exists(pf => pf.FolderID == c.FolderID))
                    {
                        LoadedPageFolders.Add(c);
                    }
                });
            }
        }
    }
}