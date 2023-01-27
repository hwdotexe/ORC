using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;

namespace BackendWebAPI.Core
{
    public static class HTTPServerUtilities
    {
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
