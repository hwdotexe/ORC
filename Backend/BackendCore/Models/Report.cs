using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Models
{
    public class Report
    {
        [BsonId]
        public Guid ReportID { get; set; }
        public Guid ReviewID { get; set; }
        public string ReportReason { get; set; }
        public string CharacterName { get; set; }
        public string CharacterServer { get; set; }
        public string Contact { get; set; }
        public DateTime DateCreated { get; set; }

        public Report(Guid reviewID, string reportReason, string characterName, string characterServer, string contact)
        {
            ReportID = Guid.NewGuid();
            ReviewID = reviewID;
            ReportReason = reportReason; ;
            CharacterName = characterName;
            CharacterServer = characterServer;
            Contact = contact;
            DateCreated = DateTime.Today;
        }
    }
}
