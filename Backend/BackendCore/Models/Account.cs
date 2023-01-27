using System;
using BackendCore.Models.Enum;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Models
{
    public class Account
    {
        [BsonId]
        public Guid AccountID { get; set; }
        public string DisplayName { get; set; }
        [BsonRepresentation(BsonType.String)]
        public AccountType AccountType { get; private set; }
        [BsonRepresentation(BsonType.String)]
        public AccountStatus AccountStatus { get; set; }

        public Account(string displayName, AccountType type)
        {
            AccountID = Guid.NewGuid();
            AccountType = type;
            AccountStatus = AccountStatus.ENABLED;
            DisplayName = displayName;
        }
    }
}
