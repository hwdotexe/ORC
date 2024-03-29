﻿using System;
using System.Collections.Generic;
using BackendCore.Models.Enum;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Models
{
    public class Page
    {
        [BsonId]
        public Guid PageID { get; set; }
        public Guid OwnerAccountID { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        [BsonRepresentation(BsonType.String)]
        public PagePrivacy Privacy { get; set; }
        public List<Share> Shares { get; set; }
        public DateTimeOffset DateCreated { get; set; }
        public DateTimeOffset DateModified { get; set; }

        public Page(string title, Guid owner, PagePrivacy privacy)
        {
            PageID = Guid.NewGuid();
            OwnerAccountID = owner;
            Title = title;
            Body = string.Empty;
            Privacy = privacy;
            this.Shares = new List<Share>();
            this.DateCreated = DateTimeOffset.Now;
            this.DateModified = DateTimeOffset.Now;
        }
    }
}
