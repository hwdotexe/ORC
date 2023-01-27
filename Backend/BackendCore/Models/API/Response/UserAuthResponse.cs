using BackendCore.Models.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendCore.Models.API.Response
{
    public struct UserAuthResponse
    {
        public string AuthToken { get; set; }
        public Guid UserID { get; set; }
        public string UserAvatarURL { get; set; }
        public string UserName { get; set; }
        public string UserServer { get; set; }
        public string AccountType { get; set; }
    }
}
