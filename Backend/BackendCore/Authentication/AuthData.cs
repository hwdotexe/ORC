using System;

namespace BackendCore.Authentication
{
    public struct AuthData
    {
        public Guid AccountID { get; set; }
        public string AuthToken { get; set; }
    }
}
