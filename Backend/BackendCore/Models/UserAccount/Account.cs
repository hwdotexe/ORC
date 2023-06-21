using System;
using System.Security.Cryptography;
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
        public string AvatarURL { get; set; }
        [BsonRepresentation(BsonType.String)]
        public AccountType AccountType { get; private set; }
        [BsonRepresentation(BsonType.String)]
        public AccountStatus AccountStatus { get; set; }

        public Account(string displayName, string email, AccountType type)
        {
            AccountID = Guid.NewGuid();
            AccountType = type;
            AccountStatus = AccountStatus.ENABLED;
            DisplayName = displayName;

            // TODO this may be temporary as we work to create custom avatars. Maybe we supply a selection to pick from?
            using(MD5 md5 = MD5.Create())
            {
                byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(email);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                AvatarURL = "https://www.gravatar.com/avatar/" + Convert.ToHexString(hashBytes);
            }
        }
    }
}
