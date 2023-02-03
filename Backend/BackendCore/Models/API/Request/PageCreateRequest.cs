using BackendCore.Models.Enum;

namespace BackendCore.Models.API.Request
{
    public struct PageCreateRequest
    {
        public string Title { get; set; }
        public PagePrivacy Privacy { get; set; }
    }
}
