using System;
using System.Collections.Generic;
using BackendCore.Models.Enum;
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
        public List<CampaignPlayer> Players { get; set; }
        public List<PageFolder> PageFolders { get; set; }

        public Campaign(string name, string description, Guid owner, Guid system)
        {
            CampaignID = Guid.NewGuid();
            Name = name;
            Description = description;
            OwnerAccountID = owner;
            System = system;
            Players = new List<CampaignPlayer>
            {
                new CampaignPlayer(owner, PlayerRole.Owner)
            };
            PageFolders = new List<PageFolder>();
        }
    }
}
