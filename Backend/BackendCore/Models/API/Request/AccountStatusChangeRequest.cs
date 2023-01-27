using System;
using BackendCore.Models.Enum;

namespace BackendCore.Models.API.Request
{
    public struct AccountStatusChangeRequest
    {
        public Guid TargetAccountID { get; set; }
        public AccountStatus NewAccountStatus { get; set; }
    }
}
