using System;
using BackendCore.Models.Enum;

namespace BackendCore.Models
{
	public class Share
	{
		public Guid AccountID { get; set; }
		public ShareType ShareType { get; set; }

		public Share(Guid accountID, ShareType shareType)
		{
			this.AccountID = accountID;
			this.ShareType = shareType;
		}
	}
}

	