using System;
using System.Collections.Generic;
using BackendCore.Models.Enum;

namespace BackendCore.Models.API.Request
{
    public struct EditReviewRequest
    {
        public Guid ReviewID { get; set; }
        public string Title { get; set; }
        public string ClubName { get; set; }
        public string ClubDatacenter { get; set; }
        public string ClubServer { get; set; }
        public string ClubDistrict { get; set; }
        public int ClubWard { get; set; }
        public int ClubPlot { get; set; }
        public List<CreateReviewHoursRequest> ClubHours { get; set; }
        public string Summary { get; set; }
        public double StarRating { get; set; }
        public string Website { get; set; }
        public string[] Tags { get; set; }
    }
}
