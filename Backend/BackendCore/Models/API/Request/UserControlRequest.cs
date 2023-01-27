using BackendCore.Models.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendCore.Models.API.Request
{
    public struct UserControlRequest
    {
        public Guid UserID { get; set; }
        public UserAccountStatus AccountStatus { get; set; }
    }
}
