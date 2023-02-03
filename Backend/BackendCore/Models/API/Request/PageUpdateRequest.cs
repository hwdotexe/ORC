using System;
using BackendCore.Models.Enum;

namespace BackendCore.Models.API.Request
{
    public struct PageUpdateRequest
    {
        public Guid PageID { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public PagePrivacy Privacy { get; set; }
    }
}
