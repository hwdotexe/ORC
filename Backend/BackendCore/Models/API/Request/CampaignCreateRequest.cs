using System;

namespace BackendCore.Models.API.Request
{
    public struct CampaignCreateRequest
    {
        public Guid System { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
