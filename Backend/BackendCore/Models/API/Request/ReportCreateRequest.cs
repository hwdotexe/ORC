using System;
using BackendCore.Models.Enum;

namespace BackendCore.Models.API.Request
{
    public struct ReportCreateRequest
    {
        public Guid ReviewID { get; set; }
        public string ReportReason { get; set; }
        public string CharacterName { get; set; }
        public string CharacterServer { get; set; }
        public string Contact { get; set; }
        public string CaptchaToken { get; set; }
    }
}
