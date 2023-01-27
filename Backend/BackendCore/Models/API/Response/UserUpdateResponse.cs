using System;
using System.Collections.Generic;
using System.Text;

namespace BackendCore.Models.API.Response
{
    public struct UserUpdateResponse
    {
        public string CharacterName { get; set; }
        public string AvatarURL { get; set; }
    }
}
