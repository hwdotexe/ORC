using BackendCore.Database.Models;
using BackendCore.Models.Enum;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendCore.Models
{
    public class Review
    {
        [BsonId]
        public Guid ReviewID { get; private set; }
        public Guid UserID { get; private set; }
        public string ReviewTitle { get; set; }
        public string ClubName { get; set; }
        public string ClubDatacenter { get; set; }
        public string ClubServer { get; set; }
        public string ClubDistrict { get; set; }
        public int ClubWard { get; set; }
        public int ClubPlot { get; set; }
        public List<ClubHours> ClubHours { get; set; }
        public string Summary { get; set; }
        public double StarRating { get; set; }
        public string Website { get; set; }
        public string[] Tags { get; set; }
        public DateTime DateCreated { get; set; }

        public Review(Guid poster, string title, string clubName, string clubDatacenter, string clubServer, string clubDistrct, int clubWard, int clubPlot, List<ClubHours> clubHours, string summary, double rating, string website, string[] tags)
        {
            UserID = poster;
            ReviewID = Guid.NewGuid();
            ReviewTitle = title;
            ClubName = clubName;
            ClubDatacenter = clubDatacenter;
            ClubServer = clubServer;
            ClubDistrict = clubDistrct;
            ClubWard = clubWard;
            ClubPlot = clubPlot;
            ClubHours = clubHours;
            Summary = summary;
            StarRating = rating;
            Website = website;
            Tags = tags;
            DateCreated = DateTime.Today;
        }
    }
}