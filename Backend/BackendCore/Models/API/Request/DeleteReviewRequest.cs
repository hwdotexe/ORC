using System;
using BackendCore.Models.Enum;

namespace BackendCore.Models.API.Request
{
    public struct DeleteReviewRequest
    {
        public Guid ReviewID { get; set; }
    }
}
