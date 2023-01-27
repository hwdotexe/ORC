using System;
namespace BackendCore.Authentication
{
    public struct UserSession
    {
        public Guid UserID { get; }
        public DateTime Expires { get; private set; }

        public UserSession(Guid userID, DateTime expires)
        {
            UserID = userID;
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
