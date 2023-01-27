using System;
using BackendCore.Authentication;
using Microsoft.AspNetCore.Http;

namespace BackendCore.Extensions
{
    public static class HttpContextExtensions
    {
        public static string GetAuthToken(this HttpContext context)
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

        public static string GetCaptchaToken(this HttpContext context)
        {
            try
            {
                var key = context.Request.Headers["X-Captcha-Token"];

                if (!string.IsNullOrEmpty(key))
                {
                    var token = key.ToString();

                    return token;
                }
            }
            catch (Exception) { }

            return null;
        }

        public static AccountSession? GetAccountSession(this HttpContext context)
        {
            try
            {
                var token = GetAuthToken(context);

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
