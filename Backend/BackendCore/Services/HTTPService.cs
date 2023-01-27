using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;

namespace BackendCore.Services
{
    public class HTTPService
    {
        public static string GET(string url)
        {
            var data = string.Empty;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                data = reader.ReadToEnd();
            }

            return data;
        }

        public static string POST(string url, string body)
        {
            var data = string.Empty;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "POST";

            using (Stream requestStream = request.GetRequestStream())
            using (StreamWriter writer = new StreamWriter(requestStream))
            {
                writer.Write(body);
            }

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                data = reader.ReadToEnd();
            }

            return data;
        }
    }
}
