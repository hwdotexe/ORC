using System;
using System.Collections.Generic;
using System.Text;
using BackendCore.Authentication;
using Microsoft.AspNetCore.Http;

namespace BackendCore.Extensions
{
    public static class HttpContextExtensions
    {
        public static string GetUserAuthToken(this HttpContext context)
        {
            try
            {
                var key = context.Request.Headers["Authorization"];

                if (!string.IsNullOrEmpty(key))
                {
                    var token = key.ToString().Split("Bearer ")[1];

                    return token;
                }
            }
            catch (Exception) { }

            return null;
        }

        public static UserSession? GetUserSession(this HttpContext context)
        {
            try
            {
                var token = GetUserAuthToken(context);

                if (!string.IsNullOrEmpty(token))
                {
                    return App.GetState().Auth.GetSession(token);
                }
            }
            catch (Exception) { }

            return null;
        }
    }
}
