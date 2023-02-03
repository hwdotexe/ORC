using System;
using BackendCore.Models.Enum;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Models
{
    public class CampaignPlayer
    {
        public Guid AccountID { get; set; }
        [BsonRepresentation(BsonType.String)]
        public PlayerRole Role { get; set; }

        public CampaignPlayer(Guid accountID, PlayerRole role)
        {
            AccountID = accountID;
            Role = role;
        }
    }
}
