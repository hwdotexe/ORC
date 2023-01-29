using System;

namespace BackendCore.Models.API.Request
{
    public struct CharacterCreateRequest
    {
        public string Name { get; set; }
        public Guid System { get; set; }
    }
}
