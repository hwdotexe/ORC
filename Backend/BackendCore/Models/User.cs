using BackendCore.Services;
using BackendCore.Models.Enum;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendCore.Models
{
    /// <summary>
    /// Represents a site user.
    /// </summary>
    public class User
    {
        [BsonId]
        public Guid UserID { get; set; }
        public string CharacterName { get; set; }
        public string CharacterServer { get; set; }
        public string CharacterAvatarURL { get; set; }
        [BsonRepresentation(BsonType.String)]
        public UserAccountType AccountType { get; private set; }
        [BsonRepresentation(BsonType.String)]
        public UserAccountStatus AccountStatus { get; set; }

        public User(string characterName, string characterServer, UserAccountType type)
        {
            UserID = Guid.NewGuid();
            CharacterName = characterName;
            CharacterServer = characterServer;
            AccountType = type;
            AccountStatus = UserAccountStatus.ENABLED;
        }

        public UserAccountType GetAccountType()
        {
            return AccountType;
        }
    }
}
