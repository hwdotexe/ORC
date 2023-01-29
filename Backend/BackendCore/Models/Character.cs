using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Models
{
    public class Character
    {
        [BsonId]
        public Guid CharacterID { get; set; }
        public Guid OwnerAccountID { get; set; }
        public string Name { get; set; }
        public Guid System { get; set; }
        public Dictionary<string, object> CharacterFields { get; set; }

        public Character(string name, Guid owner, Guid system)
        {
            Name = name;
            OwnerAccountID = owner;
            System = system;
            CharacterFields = new Dictionary<string, object>();
        }
    }
}
