using System.Collections.Generic;
using BackendCore.Models.GameSystem;

namespace BackendCore.Models.API.Request
{
    public struct SystemCreateRequest
    {
        public string Name { get; set; }
        public string Version { get; set; }
        public string Publisher { get; set; }
        public List<CharacterFieldValueProvider> CharacterFieldValueProviders { get; set; }
        public List<CharacterField> CharacterFields { get; set; }
    }
}
