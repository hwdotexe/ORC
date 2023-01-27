using System;
using System.Collections.Generic;
using System.Text;

namespace BackendCore.Models
{
    public class ClubHours
    {
        public string? Day { get; set; }
        public string? Open { get; set; }
        public string? Close { get; set; }
        public string? VariableDay { get; set; }
        public string? VariableTimes { get; set; }
    }
}
