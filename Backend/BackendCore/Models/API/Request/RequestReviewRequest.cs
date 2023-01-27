using BackendCore.Models.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendCore.Models.API.Request
{
    public struct RequestReviewRequest
    {
        public string RequestorServer { get; set; }
        public string RequestorName { get; set; }
        public string ClubName { get; set; }
        public string ClubDatacenter { get; set; }
        public string ClubServer { get; set; }
        public string ClubDistrict { get; set; }
        public int ClubWard { get; set; }
        public int ClubPlot { get; set; }
        public string ClubHours { get; set; }
        public string ClubWebsite { get; set; }
        public string Info { get; set; }
        public string CaptchaToken { get; set; }
    }
}
