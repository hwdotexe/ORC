﻿using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace BackendAPI.Mappers
{
    public static class APIRequestMapper
    {
        public static T? MapRequestToModel<T>(JObject request) where T : struct
        {
            try
            {
                foreach (var prop in typeof(T).GetProperties())
                {
                    if (request.GetValue(prop.Name, StringComparison.OrdinalIgnoreCase) == null)
                    {
                        return null;
                    }
                }

                return (T)JsonConvert.DeserializeObject(request.ToString(), typeof(T));
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}