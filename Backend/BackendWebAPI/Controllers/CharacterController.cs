using System;
using BackendAPI.Mappers;
using BackendCore;
using BackendCore.Extensions;
using BackendCore.Models;
using BackendCore.Models.API.Request;
using BackendCore.Services;
using BackendWebAPI.Core;
using Microsoft.AspNetCore.Mvc;

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
                var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                var request = APIRequestMapper.MapRequestToModel<CharacterCreateRequest>(body);
                var sessionValue = session.Value;

                if (request != null)
                {
                    var requestValue = request.Value;

                    if (CaptchaService.IsSafeRequest(HttpContext, "CREATE_CHARACTER"))
                    {
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
                        return StatusCode(429);
                    }
                }
                else
                {
                    return BadRequest();
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
                            // TODO - validation on the allowed type?
                            character.CharacterFields = requestValue.CharacterFields;
                            character.Name = requestValue.Name;

                            App.GetState().DB.UpdateCharacter(character);

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
    }
}
