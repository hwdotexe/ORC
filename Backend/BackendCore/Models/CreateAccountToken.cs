using System;
using System.Collections.Generic;
using System.Text;
using BackendCore.Models.Enum;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Database.Models
{
    public class CreateAccountToken
    {
        [BsonId]
        public Guid TokenID { get; set; }
        public string Token { get; set; }
        public UserAccountType AccountType { get; set; }

        public CreateAccountToken(string token, UserAccountType type)
        {
            TokenID = Guid.NewGuid();
            Token = token;
            AccountType = type;
        }
    }
}
