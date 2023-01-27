using System;
using BackendCore.Models.Enum;

namespace BackendCore.Models.API.Request
{
    public struct DeleteAccountTokenRequest
    {
        public Guid TokenID { get; set; }
    }
}
