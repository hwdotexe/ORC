using System;
using System.Collections.Generic;

namespace BackendCore.Models.API.Response
{
    public struct PageFolderGetResponse
    {
        public Guid FolderID { get; set; }
        public List<Page> Pages { get; set; }
    }
}
