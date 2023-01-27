using BackendCore.Models.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendCore.Models.API.Request
{
    public struct UserCreateRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string CreateAccountToken { get; set; }
        public string CharacterServer { get; set; }
        public string CharacterName { get; set; }
        public string CaptchaToken { get; set; }
    }
}
