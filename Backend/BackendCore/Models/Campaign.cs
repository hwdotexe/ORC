using System;
using System.Collections.Generic;
using BackendCore.Models.Enum;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Models
{
    public class Campaign
    {
        [BsonId]
        public Guid CampaignID { get; set; }
        public Guid OwnerAccountID { get; set; }
        public Guid System { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [BsonRepresentation(BsonType.Document)] // TODO: experimental
        public Dictionary<string, PlayerType> Players { get; set; }

        public Campaign(string name, string description, Guid owner, Guid system)
        {
            Name = name;
            Description = description;
            OwnerAccountID = owner;
            System = system;
            Players = new Dictionary<string, PlayerType>();

            Players.Add(owner.ToString(), PlayerType.GameMaster);
        }
    }
}
