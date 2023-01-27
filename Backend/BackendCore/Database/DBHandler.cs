using System;
using System.Collections.Generic;
using BackendCore.Database.Models;
using BackendCore.Models;
using MongoDB.Driver;

namespace BackendCore.Database
{
    public class DBHandler
    {
        private readonly string _dbname;
        private readonly string _accountstable = "Accounts";
        private readonly string _logindatatable = "LoginData";
        private IMongoDatabase database;

        public DBHandler(string databaseName)
        {
            Console.WriteLine("Loading Database...");

            _dbname = databaseName;
            var client = new MongoClient(App.DBConnectionString);
            database = client.GetDatabase(_dbname);

            Console.WriteLine("Database connected!");
        }

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

        private List<T> ReadRows<T>(string table, string field, object value)
        {
            var collection = database.GetCollection<T>(table);
            var filter = Builders<T>.Filter.Eq(field, value);

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

        private async void Delete<T>(string table, string field, object value)
        {
            var collection = database.GetCollection<T>(table);
            var filter = Builders<T>.Filter.Eq(field, value);

            await collection.DeleteOneAsync(filter);
        }

        private async void DeleteMany<T>(string table, string field, object value)
        {
            var collection = database.GetCollection<T>(table);
            var filter = Builders<T>.Filter.Eq(field, value);

            await collection.DeleteManyAsync(filter);
        }
    }
}
