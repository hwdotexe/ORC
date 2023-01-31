using System;

namespace BackendCore.Models.API.Request
{
    public struct CharacterDeleteRequest
    {
        public Guid CharacterID { get; set; }
    }
}
