using BackendAPI.Core;
using BackendCore.Database.Models;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace BackendCore.Authentication
{
    /// <summary>
    /// Responsible for authenticating users and managing sessions.
    /// </summary>
    public class Gatekeeper
    {
        private readonly int sessionDurationHours = 1;
        private readonly static string salt = "White-haired Anime Husbando";
        private readonly static string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        private Dictionary<string, UserSession> Sessions { get; }
        private RequestCache LoginAttemptCache { get; set; }

        public Gatekeeper()
        {
            Sessions = new Dictionary<string, UserSession>();
            LoginAttemptCache = new RequestCache(10);
        }

        /// <summary>
        /// Attempts to authenticate a user, given a login Email and plaintext password.
        /// The database result will be cached if the attempt was unsuccessful, so as to
        /// limit future database calls, improve performance, and avoid a potential DDoS.
        /// The cache is cleared on a successful login attempt.
        /// </summary>
        /// <param name="email">The email to look up.</param>
        /// <param name="plaintextPwd">The plaintext password of the user.</param>
        /// <returns>A session Auth Token if successful. Otherwise, returns null.</returns>
        public AuthData? Authenticate(string email, string plaintextPwd)
        {
            LoginData loginData;
            var lowerEmail = email.ToLower();

            if(LoginAttemptCache.Cache.Contains(lowerEmail)) {
                loginData = (LoginData)LoginAttemptCache.Cache.Get(lowerEmail);
            }
            else
            {
                loginData = App.GetState().DB.GetLoginData(email.ToLower());

                if (loginData != null)
                {
                    LoginAttemptCache.Cache.Set(lowerEmail, loginData, LoginAttemptCache.GetCachePolicy());
                }
            }

            if (loginData != null)
            {
                if (loginData.PasswordHash == GenerateHash(plaintextPwd))
                {
                    LoginAttemptCache.Cache.Remove(lowerEmail);

                    return new AuthData
                    {
                        UserID = loginData.UserID,
                        AuthToken = CreateSession(loginData.UserID)
                    };
                }
            }

            return null;
        }

        public bool UserExists(string email)
        {
            var lowerEmail = email.ToLower();

            if (LoginAttemptCache.Cache.Contains(lowerEmail))
            {
                return LoginAttemptCache.Cache.Get(lowerEmail) != null;
            }

            var loginData = App.GetState().DB.GetLoginData(email.ToLower());

            return loginData != null;
        }

        /// <summary>
        /// Finds and returns the active user session belonging to the auth token provided, or
        /// null if none were found.
        /// </summary>
        /// <param name="authToken">The token to search by.</param>
        /// <returns>A UserSession if found, otherwise null.</returns>
        public UserSession? GetSession(string authToken)
        {
            if(Sessions.ContainsKey(authToken))
            {
                var session = Sessions[authToken];
                var now = DateTime.Now;

                if (session.Expires > now)
                {
                    var newDateTime = now.AddHours(sessionDurationHours);

                    session.UpdateExpiration(newDateTime);

                    Sessions[authToken] = session;
                    return session;
                }
                else
                {
                    InvalidateSession(authToken);
                }
            }

            return null;
        }

        /// <summary>
        /// Creates a new UserSession for the given user.
        /// </summary>
        /// <param name="userID">The User for whom to create the session.</param>
        /// <returns>The authentication token for this session.</returns>
        public string CreateSession(Guid userID)
        {
            var expires = DateTime.Now.AddHours(sessionDurationHours);
            var session = new UserSession(userID, expires);
            var authToken = GenerateSessionToken();

            Sessions.Add(authToken, session);

            return authToken;
        }

        /// <summary>
        /// Invalidates the session belonging to the token provided.
        /// </summary>
        /// <param name="token">The token to invalidate.</param>
        public void InvalidateSession(string token)
        {
            if(Sessions.ContainsKey(token))
            {
                Sessions.Remove(token);
            }
        }

        /// <summary>
        /// Invalidates all active sessions belonging to the User provided.
        /// </summary>
        /// <param name="userID">The user to invalidate.</param>
        public void InvalidateSessions(Guid userID)
        {
            var tokenList = new List<string>();

            foreach(KeyValuePair<string, UserSession> entry in Sessions)
            {
                if(entry.Value.UserID == userID)
                {
                    tokenList.Add(entry.Key);
                }
            }

            tokenList.ForEach(t => Sessions.Remove(t));
        }

        /// <summary>
        /// Loops through all open sessions and prunes any that have past their
        /// expiration time.
        /// </summary>
        public void InvalidateExpiredSessions()
        {
            var tokenList = new List<string>();

            foreach (KeyValuePair<string, UserSession> entry in Sessions)
            {
                if (entry.Value.Expires <= DateTime.Now)
                {
                    tokenList.Add(entry.Key);
                }
            }

            tokenList.ForEach(t => InvalidateSession(t));
        }

        /// <summary>
        /// Hashes the plaintext using SHA-256, and returns the hash in Base64 encoding.
        /// </summary>
        /// <param name="plaintext">The plaintext to hash.</param>
        /// <returns>A Base64-encoded string of the hash.</returns>
        public string GenerateHash(string plaintext)
        {
            using (var sha = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(salt + plaintext);
                return Convert.ToBase64String(sha.ComputeHash(bytes));
            }
        }

        private string GenerateSessionToken()
        {
            using(var AES = Aes.Create())
            {
                AES.GenerateIV();
                AES.GenerateKey();

                return Convert.ToBase64String(AES.Key);
            }
        }

        public string GenerateRandomToken()
        {
            var random = new Random();
            var randomToken = "";

            for(int i=0; i<10; i++)
            {
                randomToken += alphabet[random.Next(0, alphabet.Length)];
            }

            return randomToken;
        }
    }
}
