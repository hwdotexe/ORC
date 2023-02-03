using System;
using BackendCore.Models.Enum;

namespace BackendCore.Models.API.Request
{
    public struct CampaignAccountAddRequest
    {
        public Guid CampaignID { get; set; }
        public Guid AccountID { get; set; }
        public PlayerRole PlayerType { get; set; }
    }
}
