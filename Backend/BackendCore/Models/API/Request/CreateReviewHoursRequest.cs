using System;
using System.Collections.Generic;
using System.Text;

namespace BackendCore.Models.API.Request
{
    public struct CreateReviewHoursRequest
    {
        public DayOfWeek Day { get; set; }
        public string Open { get; set; }
        public string Close { get; set; }
        public string TimezoneID { get; set; }
        public string VariableDay { get; set; }
        public string VariableTimes { get; set; }
    }
}
