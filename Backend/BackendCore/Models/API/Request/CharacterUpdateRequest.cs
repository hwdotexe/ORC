using System;
using System.Collections.Generic;

namespace BackendCore.Models.API.Request
{
    public struct CharacterUpdateRequest
    {
        public Guid CharacterID { get; set; }
        public string Name { get; set; }
        public Dictionary<string, object> CharacterFields { get; set; }
    }
}
