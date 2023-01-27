using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace BackendCore.Services
{
    public class UserService
    {
        public static string ExtractAvatarURL(string CharacterName, string CharacterServer)
        {
            var response = HTTPService.GET($"https://xivapi.com/character/search?name={CharacterName.Replace(' ', '+')}&server={CharacterServer}");

            dynamic deserialized = JsonConvert.DeserializeObject(response);

            try
            {
                return deserialized.Results[0].Avatar;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}