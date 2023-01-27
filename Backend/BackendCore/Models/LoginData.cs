using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Database.Models
{
    public class LoginData
    {
        [BsonId]
        public Guid UserID { get; set; }
        public string LoginEmail { get; set; }
        public string PasswordHash { get; set; }
    }
}
