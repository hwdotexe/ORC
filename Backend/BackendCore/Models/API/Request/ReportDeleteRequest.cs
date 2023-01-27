using System;
using BackendCore.Models.Enum;

namespace BackendCore.Models.API.Request
{
    public struct ReportDeleteRequest
    {
        public Guid ReportID { get; set; }
    }
}
