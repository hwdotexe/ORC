using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json.Linq;

namespace BackendCore.Services
{
    public class CaptchaService
    {
        public static string _captchaUrl;
        public static string _apiKey;
        public static string _projectID;
        public static string _siteKey;

        public static void Init(string apiKey, string projectID, string siteKey)
        {
            _apiKey = apiKey;
            _projectID = projectID;
            _siteKey = siteKey;
            _captchaUrl = $"https://recaptchaenterprise.googleapis.com/v1/projects/{_projectID}/assessments?key={_apiKey}";
        }

        public static double GetScore(string token, string action)
        {
            if (App.isDevelopment)
            {
                return 1d;
            }

            var body = new JObject();
            var evt = new JObject();

            evt.Add("token", token);
            evt.Add("siteKey", _siteKey);
            evt.Add("expectedAction", action);

            body.Add("event", evt);

            var response = JObject.Parse(HTTPService.POST(_captchaUrl, body.ToString()));

            try
            {
                return double.Parse(response["riskAnalysis"]["score"].ToString());
            }
            catch (Exception)
            {
                return 0d;
            }
        }
    }
}