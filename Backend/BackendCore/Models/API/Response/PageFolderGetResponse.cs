using System;

namespace BackendCore.Models.API.Response
{
    public struct PageFolderListResponse
    {
        public Guid FolderID { get; set; }
        public string FolderName { get; set; }
        public int PageCount { get; set; }
        public int ShareCount { get; set; }
    }
}
