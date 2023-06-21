using System;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Database.Models
{
    public class LoginData
    {
        [BsonId]
        public Guid AccountID { get; set; }
        public string LoginEmail { get; set; }
        public string PasswordHash { get; set; }
    }
}
