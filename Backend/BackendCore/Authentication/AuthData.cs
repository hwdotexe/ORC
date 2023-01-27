using System;
using System.Collections.Generic;
using System.Text;

namespace BackendCore.Authentication
{
    public struct AuthData
    {
        public Guid UserID { get; set; }
        public string AuthToken { get; set; }
    }
}
