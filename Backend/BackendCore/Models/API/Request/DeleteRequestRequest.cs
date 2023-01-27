using System;
using BackendCore.Models.Enum;

namespace BackendCore.Models.API.Request
{
    public struct DeleteRequestRequest
    {
        public Guid RequestID { get; set; }
    }
}
