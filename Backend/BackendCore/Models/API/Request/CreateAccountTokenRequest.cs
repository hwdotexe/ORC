using System;
using BackendCore.Models.Enum;

namespace BackendCore.Models.API.Request
{
    public struct CreateAccountTokenRequest
    {
        public UserAccountType AccountType { get; set; }
    }
}
