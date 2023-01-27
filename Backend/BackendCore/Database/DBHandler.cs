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
        private readonly string _userstable = "Users";
        private readonly string _reviewstable = "Reviews";
        private readonly string _requestsTable = "Requests";
        private readonly string _reportsTable = "Reports";
        private readonly string _accounttokens = "AccountTokens";
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

        public User GetUser(Guid userID)
        {
            var r = ReadRows<User>(_userstable, "UserID", userID);

            if(r.Count > 0)
            {
                return r[0];
            }
            else
            {
                return null;
            }
        }

        public List<User> GetUsers()
        {
            var r = ReadRows<User>(_userstable);

            return r;
        }

        public void InsertUser(User user)
        {
            Insert(_userstable, user);
        }

        public void UpdateUser(User user)
        {
            Update(_userstable, "UserID", user.UserID, user);
        }

        public List<Review> GetReviews()
        {
            return ReadRows<Review>(_reviewstable);
        }

        public void InsertReview(Review review)
        {
            Insert(_reviewstable, review);
        }

        public void UpdateReview(Review review)
        {
            Update(_reviewstable, "ReviewID", review.ReviewID, review);
        }

        public void DeleteReview(Review review)
        {
            Delete<Review>(_reviewstable, "ReviewID", review.ReviewID);
        }

        public List<Request> GetRequests()
        {
            return ReadRows<Request>(_requestsTable);
        }

        public void InsertRequest(Request request)
        {
            Insert(_requestsTable, request);
        }

        public void DeleteRequest(Request request)
        {
            Delete<Request>(_requestsTable, "RequestID", request.RequestID);
        }


        public List<Report> GetReports()
        {
            return ReadRows<Report>(_reportsTable);
        }

        public void InsertReport(Report report)
        {
            Insert(_reportsTable, report);
        }

        public void DeleteReport(Report report)
        {
            Delete<Report>(_reportsTable, "ReportID", report.ReportID);
        }


        public LoginData GetLoginData(string email)
        {
            var r = ReadRows<LoginData>(_logindatatable, "LoginEmail", email);

            if(r.Count > 0)
            {
                return r[0];
            }

            return null;
        }

        public void InsertLoginData(LoginData data)
        {
            Insert(_logindatatable, data);
        }

        public CreateAccountToken GetAccountToken(string token)
        {
            var r = ReadRows<CreateAccountToken>(_accounttokens, "Token", token);

            if (r.Count > 0)
            {
                return r[0];
            }
            else
            {
                return null;
            }
        }

        public List<CreateAccountToken> GetAccountTokens()
        {
            return ReadRows<CreateAccountToken>(_accounttokens);
        }

        public void InsertAccountToken(CreateAccountToken token)
        {
            Insert(_accounttokens, token);
        }

        public void DeleteAccountToken(string tokenID)
        {
            Delete<CreateAccountToken>(_accounttokens, "TokenID", tokenID);
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
