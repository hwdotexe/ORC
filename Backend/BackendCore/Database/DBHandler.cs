using System;
using System.Collections.Generic;
using System.Linq;
using BackendCore.Database.Models;
using BackendCore.Models;
using BackendCore.Models.GameSystem;
using MongoDB.Driver;

namespace BackendCore.Database
{
    public class DBHandler
    {
        private readonly string _dbname;
        private readonly string _accountstable = "Accounts";
        private readonly string _logindatatable = "LoginData";
        private readonly string _systemstable = "Systems";
        private readonly string _charactersstable = "Characters";
        private readonly string _campaignstable = "Campaigns";
        private readonly string _pagestable = "Pages";
        private readonly string _pagefolderstable = "PageFolders";
        private IMongoDatabase database;

        public DBHandler(string databaseName)
        {
            Console.WriteLine("Loading Database...");

            _dbname = databaseName;
            var client = new MongoClient(App.DBConnectionString);
            database = client.GetDatabase(_dbname);

            Console.WriteLine("Database connected!");
        }

        #region accounts
        public Account GetAccount(Guid accountID)
        {
            var r = ReadRows<Account>(_accountstable, "AccountID", accountID);

            if (r.Count > 0)
            {
                return r[0];
            }
            else
            {
                return null;
            }
        }

        public List<Account> GetAccounts()
        {
            var r = ReadRows<Account>(_accountstable);

            return r;
        }

        public void InsertAccount(Account account)
        {
            Insert(_accountstable, account);
        }

        public void UpdateAccount(Account account)
        {
            Update(_accountstable, "AccountID", account.AccountID, account);
        }
        #endregion

        #region logindata
        public LoginData GetLoginData(string email)
        {
            var r = ReadRows<LoginData>(_logindatatable, "LoginEmail", email);

            if (r.Count > 0)
            {
                return r[0];
            }

            return null;
        }

        public void InsertLoginData(LoginData data)
        {
            Insert(_logindatatable, data);
        }
        #endregion

        #region systems
        public List<GameSystem> GetSystems(Guid accountID)
        {
            var r = ReadRows<GameSystem>(_systemstable, "OwnerAccountID", accountID);

            if (r.Count > 0)
            {
                return r;
            }
            else
            {
                return null;
            }
        }

        public void InsertSystem(GameSystem system)
        {
            Insert(_systemstable, system);
        }
        #endregion

        #region characters
        public List<Character> GetCharacters(Guid accountID)
        {
            var r = ReadRows<Character>(_charactersstable, "OwnerAccountID", accountID);

            if (r.Count > 0)
            {
                return r;
            }
            else
            {
                return null;
            }
        }

        public void InsertCharacter(Character character)
        {
            Insert(_charactersstable, character);
        }

        public void UpdateCharacter(Character character)
        {
            Update(_charactersstable, "CharacterID", character.CharacterID, character);
        }

        public void DeleteCharacter(Character character)
        {
            Delete<Character>(_charactersstable, "CharacterID", character.CharacterID);
        }
        #endregion

        #region campaigns
        public List<Campaign> GetCampaigns(Guid accountID)
        {
            var r = ReadRows<Campaign>(_campaignstable, "Players.AccountID", accountID);

            if (r.Count > 0)
            {
                return r;
            }
            else
            {
                return null;
            }
        }

        public void InsertCampaign(Campaign campaign)
        {
            Insert(_campaignstable, campaign);
        }

        public void UpdateCampaign(Campaign campaign)
        {
            Update(_campaignstable, "CampaignID", campaign.CampaignID, campaign);
        }

        public void DeleteCampaign(Campaign campaign)
        {
            Delete<Campaign>(_campaignstable, "CampaignID", campaign.CampaignID);
        }
        #endregion

        #region pages
        public List<Page> GetPages(Guid accountID)
        {
            var r = ReadRows<Page>(_pagestable, "OwnerAccountID", accountID);

            if (r.Count > 0)
            {
                return r;
            }
            else
            {
                return null;
            }
        }

        public List<Page> GetPages(List<Guid> pageIDs)
        {
            var filter = Builders<Page>.Filter.In("PageID", pageIDs);
            var r = ReadRows<Page>(_pagestable, filter);

            if (r.Count > 0)
            {
                return r;
            }
            else
            {
                return null;
            }
        }

        public Page GetPage(Guid pageID)
        {
            var r = ReadRows<Page>(_pagestable, "PageID", pageID);

            if (r.Count > 0)
            {
                return r[0];
            }
            else
            {
                return null;
            }
        }

        public void InsertPage(Page page)
        {
            Insert(_pagestable, page);
        }

        public void UpdatePage(Page page)
        {
            Update(_pagestable, "PageID", page.PageID, page);
        }

        public void DeletePage(Page page)
        {
            Delete<Page>(_pagestable, "PageID", page.PageID);
        }

        public void DeletePage(Guid pageID)
        {
            Delete<Page>(_pagestable, "PageID", pageID);
        }

        public void DeletePages(List<Guid> pageIDs)
        {
            var filter = Builders<Page>.Filter.In("PageID", pageIDs);
            DeleteMany<Page>(_pagestable, filter);
        }

        #endregion

        #region pagefolders
        public List<PageFolder> GetPageFolders(Guid accountID)
        {
            var ownerFilter = Builders<PageFolder>.Filter.Eq("OwnerAccountID", accountID);
            var sharedFilter = Builders<PageFolder>.Filter.Eq("Shares.AccountID", accountID);
            var r = ReadRows<PageFolder>(_pagefolderstable, new List<FilterDefinition<PageFolder>> { ownerFilter, sharedFilter });

            if (r.Count > 0)
            {
                return r;
            }
            else
            {
                return null;
            }
        }

        public PageFolder GetPageFolder(Guid folderID)
        {
            var r = ReadRows<PageFolder>(_pagefolderstable, "FolderID", folderID);

            if (r.Count > 0)
            {
                return r[0];
            }
            else
            {
                return null;
            }
        }

        public void InsertPageFolder(PageFolder folder)
        {
            Insert(_pagefolderstable, folder);
        }

        public void UpdatePageFolder(PageFolder folder)
        {
            Update(_pagefolderstable, "FolderID", folder.FolderID, folder);
        }

        public void DeletePageFolder(PageFolder folder)
        {
            Delete<PageFolder>(_pagefolderstable, "FolderID", folder.FolderID);
        }
        #endregion

        #region database
        private List<T> ReadRows<T>(string table, string field, object value)
        {
            var collection = database.GetCollection<T>(table);
            var filter = Builders<T>.Filter.Eq(field, value);

            // TODO: is this not async?
            return collection.Find(filter).ToList();
        }

        private List<T> ReadRows<T>(string table, FilterDefinition<T> filter)
        {
            var collection = database.GetCollection<T>(table);

            // TODO: is this not async?
            return collection.Find(filter).ToList();
        }

        private List<T> ReadRows<T>(string table, List<FilterDefinition<T>> filters)
        {
            var collection = database.GetCollection<T>(table);
            var filter = Builders<T>.Filter.Or(filters);

            // TODO: is this not async?
            return collection.Find(filter).ToList();
        }

        private List<T> ReadRows<T>(string table)
        {
            var collection = database.GetCollection<T>(table);

            return collection.Find(_ => true).ToList();
        }

        private async void Insert<T>(string table, T record)
        {
            var collection = database.GetCollection<T>(table);

            await collection.InsertOneAsync(record);
        }

        private async void InsertMany<T>(string table, List<T> records)
        {
            var collection = database.GetCollection<T>(table);

            await collection.InsertManyAsync(records);
        }

        private async void Update<T>(string table, string field, object value, T record)
        {
            var collection = database.GetCollection<T>(table);
            var filter = Builders<T>.Filter.Eq(field, value);

            await collection.ReplaceOneAsync(filter, record);
        }

        private async void Update<T>(string table, FilterDefinition<T> filter, T record)
        {
            var collection = database.GetCollection<T>(table);

            await collection.ReplaceOneAsync(filter, record);
        }

        private async void Delete<T>(string table, string field, object value)
        {
            var collection = database.GetCollection<T>(table);
            var filter = Builders<T>.Filter.Eq(field, value);

            await collection.DeleteOneAsync(filter);
        }

        private async void Delete<T>(string table, FilterDefinition<T> filter)
        {
            var collection = database.GetCollection<T>(table);

            await collection.DeleteOneAsync(filter);
        }

        private async void DeleteMany<T>(string table, string field, object value)
        {
            var collection = database.GetCollection<T>(table);
            var filter = Builders<T>.Filter.Eq(field, value);

            await collection.DeleteManyAsync(filter);
        }

        private async void DeleteMany<T>(string table, FilterDefinition<T> filter)
        {
            var collection = database.GetCollection<T>(table);

            await collection.DeleteManyAsync(filter);
        }
        #endregion
    }
}
