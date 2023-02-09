using System;
using BackendCore.Models.Enum;

namespace BackendCore.Models.API.Request
{
    public struct PageFolderCreateRequest
    {
        public string Name { get; set; }
        public PagePrivacy Privacy { get; set; }
    }
}
