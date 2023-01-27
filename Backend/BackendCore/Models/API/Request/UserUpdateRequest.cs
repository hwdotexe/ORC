using BackendCore.Models.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendCore.Models.API.Request
{
    public struct UserUpdateRequest
    {
        public string CharacterName { get; set; }
        public string CharacterServer { get; set; }
    }
}
