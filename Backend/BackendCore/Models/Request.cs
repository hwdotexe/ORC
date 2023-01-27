using BackendCore.Database.Models;
using BackendCore.Models.Enum;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendCore.Models
{
    public class Request
    {
        [BsonId]
        public Guid RequestID { get; private set; }
        public string RequestorServer { get; set; }
        public string RequestorName { get; set; }
        public string ClubName { get; set; }
        public string ClubServer { get; set; }
        public string ClubDatacenter { get; set; }
        public string ClubDistrict { get; set; }
        public int ClubWard { get; set; }
        public int ClubPlot { get; set; }
        public string ClubHours { get; set; }
        public string ClubWebsite { get; set; }
        public string Info { get; set; }

        public Request(string server, string requestorName, string clubName, string clubDatacenter, string clubServer, string clubDistrct, int clubWard, int clubPlot, string clubHours, string website, string info)
        {
            RequestID = Guid.NewGuid();
            RequestorServer = server;
            RequestorName = requestorName;
            ClubName = clubName;
            ClubDatacenter = clubDatacenter;
            ClubServer = clubServer;
            ClubDistrict = clubDistrct;
            ClubWard = clubWard;
            ClubPlot = clubPlot;
            ClubHours = clubHours;
            ClubWebsite = website;
            Info = info;
        }
    }
}