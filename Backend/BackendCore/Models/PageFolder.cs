using System;
using System.Collections.Generic;
using BackendCore.Models.Enum;

namespace BackendCore.Models
{
    public class PageFolder
    {
        public Guid FolderID { get; set; }
        public string FolderName { get; set; }  
        public PagePrivacy Privacy { get; set; }
        public List<Guid> Pages { get; set; }

        public PageFolder(string folderName, PagePrivacy privacy)
        {
            this.FolderID = Guid.NewGuid();
            this.FolderName = folderName;
            this.Privacy = privacy;
            this.Pages = new List<Guid>();
        }
    }
}
