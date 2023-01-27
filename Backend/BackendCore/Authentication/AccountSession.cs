using System;
namespace BackendCore.Authentication
{
    public struct AccountSession
    {
        public Guid AccountID { get; }
        public DateTime Expires { get; private set; }

        public AccountSession(Guid accountID, DateTime expires)
        {
            AccountID = accountID;
            Expires = expires;
        }

        /// <summary>
        /// Updates this session's expiration time to a new value.
        /// </summary>
        /// <param name="newExpiration">The timestamp to use for this session's expiration.</param>
        public void UpdateExpiration(DateTime newExpiration)
        {
            Expires = newExpiration;
        }
    }
}
