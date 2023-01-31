using System;
using System.Collections.Generic;
using BackendAPI.Mappers;
using BackendCore;
using BackendCore.Extensions;
using BackendCore.Models;
using BackendCore.Models.API.Request;
using BackendCore.Models.GameSystem;
using BackendCore.Services;
using BackendWebAPI.Core;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace BackendWebAPI.Controllers
{
    [ApiController]
    [Route("v1/character")]
    public class CharacterController : ControllerBase
    {
        [HttpGet]
        public ActionResult GET_List_Character()
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "LIST_CHARACTERS"))
                {
                    var sessionValue = session.Value;
                    var characters = App.GetState().LoadedCharacters.FindAll(c => c.OwnerAccountID == sessionValue.AccountID);

                    return Ok(characters);
                }
                else
                {
                    return StatusCode(429);
                }
            }
            catch (Exception e)
            {
                HTTPServerUtilities.LogServerError(e);

                return StatusCode(500);
            }
        }

        [HttpPut]
        public ActionResult PUT_Create_Character()
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "CREATE_CHARACTER"))
                {
                    var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                    var request = APIRequestMapper.MapRequestToModel<CharacterCreateRequest>(body);
                    var sessionValue = session.Value;

                    if (request != null)
                    {
                        var requestValue = request.Value;
                        var account = App.GetState().LoadedAccounts.Find(a => a.AccountID == sessionValue.AccountID);
                        var system = App.GetState().LoadedSystems.Find(s => s.SystemID == requestValue.System);

                        if (system != null)
                        {
                            var character = new Character(requestValue.Name, account.AccountID, system.SystemID);

                            App.GetState().LoadedCharacters.Add(character);
                            App.GetState().DB.InsertCharacter(character);

                            return Created(Url.ToString(), character);
                        }
                        else
                        {
                            return NotFound();
                        }
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
                else
                {
                    return StatusCode(429);
                }
            }
            catch (Exception e)
            {
                HTTPServerUtilities.LogServerError(e);

                return StatusCode(500);
            }
        }

        [HttpPatch]
        public ActionResult PATCH_Update_Character()
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "UPDATE_CHARACTER"))
                {
                    var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                    var request = APIRequestMapper.MapRequestToModel<CharacterUpdateRequest>(body);
                    var sessionValue = session.Value;

                    if (request != null)
                    {
                        var requestValue = request.Value;
                        var character = App.GetState().LoadedCharacters.Find(a => a.OwnerAccountID == sessionValue.AccountID && a.CharacterID == requestValue.CharacterID);

                        if (character != null)
                        {
                            var system = App.GetState().LoadedSystems.Find(s => s.SystemID == character.System);

                            if (system != null)
                            {
                                // Make sure we are only adding System fields.
                                foreach (var key in requestValue.CharacterFields.Keys)
                                {
                                    var systemField = system.CharacterFields.Find(cf => cf.Name.Equals(key, StringComparison.OrdinalIgnoreCase));

                                    if (systemField == null)
                                    {
                                        return BadRequest();
                                    }

                                    // The value of this field must come from a provider.
                                    if (systemField.Provider != null)
                                    {
                                        var systemProvider = system.CharacterFieldValueProviders.Find(p => p.ProviderID.Equals(systemField.Provider, StringComparison.OrdinalIgnoreCase));

                                        if (systemField.Type == CharacterFieldType.STRING_LIST)
                                        {
                                            // Check all values
                                            try
                                            {
                                                var fieldValue = ((JArray)requestValue.CharacterFields[key]).ToObject<List<string>>();

                                                foreach (var value in fieldValue)
                                                {
                                                    if (!systemProvider.Values.Contains(value))
                                                    {
                                                        return BadRequest();
                                                    }
                                                }

                                                requestValue.CharacterFields[key] = fieldValue;
                                            }
                                            catch (Exception)
                                            {
                                                return BadRequest();
                                            }
                                        }
                                        else if (systemField.Type == CharacterFieldType.STRING)
                                        {
                                            // Check that our one value is in the provider.
                                            var fieldValue = (string)requestValue.CharacterFields[key];

                                            if (!systemProvider.Values.Contains(fieldValue))
                                            {
                                                return BadRequest();
                                            }
                                        }
                                    }
                                }

                                character.CharacterFields = requestValue.CharacterFields;
                                character.Name = requestValue.Name;

                                App.GetState().DB.UpdateCharacter(character);

                                return Ok(character);
                            }
                            else
                            {
                                return NotFound();
                            }
                        }
                        else
                        {
                            return NotFound();
                        }
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
                else
                {
                    return StatusCode(429);
                }
            }
            catch (Exception e)
            {
                HTTPServerUtilities.LogServerError(e);

                return StatusCode(500);
            }
        }

        [HttpDelete]
        public ActionResult DELETE_Delete_Character()
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "DELETE_CHARACTER"))
                {
                    var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                    var request = APIRequestMapper.MapRequestToModel<CharacterDeleteRequest>(body);
                    var sessionValue = session.Value;

                    if (request != null)
                    {
                        var requestValue = request.Value;
                        var character = App.GetState().LoadedCharacters.Find(a => a.CharacterID == requestValue.CharacterID && a.OwnerAccountID == sessionValue.AccountID);

                        if (character != null)
                        {
                            App.GetState().LoadedCharacters.Remove(character);
                            App.GetState().DB.DeleteCharacter(character);

                            return Ok();
                        }
                        else
                        {
                            return NotFound();
                        }
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
                else
                {
                    return StatusCode(429);
                }
            }
            catch (Exception e)
            {
                HTTPServerUtilities.LogServerError(e);

                return StatusCode(500);
            }
        }
    }
}
