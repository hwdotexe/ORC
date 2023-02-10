using System;
using System.Collections.Generic;
using BackendCore.Models.Enum;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Models
{
    public class PageFolder
    {
        [BsonId]
        public Guid FolderID { get; set; }
        public Guid OwnerAccountID { get; set; }
        public string FolderName { get; set; }
        public List<Guid> Pages { get; set; }
        public List<Share> Shares { get; set; }

        public PageFolder(Guid owner, string folderName)
        {
            this.FolderID = Guid.NewGuid();
            this.OwnerAccountID = owner;
            this.FolderName = folderName;
            this.Pages = new List<Guid>();
            this.Shares = new List<Share>();
        }
    }
}
