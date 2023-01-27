using BackendAPI.Core;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace BackendWebAPI.Core
{
    public static class HTTPServerUtilities
    {
        private static RequestCache cache;

        public static bool IsAPIRequestURL(string url)
        {
            return url.StartsWith($"v1/");
        }

        public static string StandardizeRequestURL(string url)
        {
            url = Regex.Replace(url, "[\\/]+", "/");

            if(url.StartsWith("/"))
            {
                url = url.Substring(1);
            }

            if (url.EndsWith("/"))
            {
                url = url.Substring(0, url.Length-1);
            }

            return url;
        }

        public static byte[] ReadFile(string path, bool doCache)
        {
            if (doCache)
            {
                if (cache == null)
                    cache = new RequestCache();

                if (cache.Cache.Contains(path))
                    return (byte[])cache.Cache.Get(path);
            }

            try
            {
                using (FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read))
                {
                    byte[] buffer;

                    int length = (int)fileStream.Length;
                    buffer = new byte[length];
                    int count;
                    int sum = 0;

                    while ((count = fileStream.Read(buffer, sum, length - sum)) > 0)
                        sum += count;

                    if(doCache)
                        cache.Cache.Set(path, buffer, cache.GetCachePolicy());

                    return buffer;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static JObject GetHTTPRequestBody(HttpRequest request)
        {
            using (var reader = new StreamReader(request.Body))
            {
                var bodyData = reader.ReadToEndAsync();

                bodyData.Wait();

                if (!string.IsNullOrEmpty(bodyData.Result))
                {
                    try
                    {
                        return JObject.Parse(bodyData.Result);
                    }
                    catch (Exception e)
                    {
                        LogServerError(e);
                    }
                }

                return new JObject();
            }
        }

        public static void LogServerError(Exception e)
        {
            Console.WriteLine("=====[ BEGIN ERROR LOG ]=====");
            Console.Write(e.GetType().ToString());
            Console.Write("> ");
            Console.Write(e.Message);
            Console.WriteLine(e.StackTrace);
            Console.WriteLine("======[ END ERROR LOG ]======");
        }
    }
}
