﻿using System;
using System.Collections.Generic;

namespace BackendCore.Models.API.Response
{
    public struct PageFolderListResponse
    {
        public Guid FolderID { get; set; }
        public Guid OwnerAccountID { get; set; }
        public string FolderName { get; set; }
        public int PageCount { get; set; }
        public List<Share> Shares { get; set; }
    }
}
