using System;

namespace BackendCore.Models.API.Response
{
    public struct AccountAuthenticatedResponse
    {
        public string AuthToken { get; set; }
        public Guid AccountID { get; set; }
        public string DisplayName { get; set; }
        public string AccountType { get; set; }
    }
}
