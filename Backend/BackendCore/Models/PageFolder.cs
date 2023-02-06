using System;
using System.Collections.Generic;

namespace BackendCore.Models
{
    public class PageFolder
    {
        public string FolderName { get; set; }
        public List<Guid> Pages { get; set; }
    }
}
