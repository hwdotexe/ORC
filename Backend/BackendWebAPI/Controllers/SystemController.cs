using System;
using System.Collections.Generic;
using BackendAPI.Mappers;
using BackendCore;
using BackendCore.Extensions;
using BackendCore.Models.API.Request;
using BackendCore.Models.GameSystem;
using BackendCore.Services;
using BackendWebAPI.Core;
using Microsoft.AspNetCore.Mvc;

namespace BackendWebAPI.Controllers
{
    [ApiController]
    [Route("v1/system")]
    public class SystemController : ControllerBase
    {
        [HttpGet]
        public ActionResult GET_List_Systems()
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "LIST_SYSTEMS"))
                {
                    var sessionValue = session.Value;
                    List<GameSystem> systems = App.GetState().LoadedSystems.FindAll(system => system.OwnerAccountID == sessionValue.AccountID);

                    return Ok(systems);
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
        public ActionResult PUT_Create_System()
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "CREATE_SYSTEM"))
                {
                    var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                    var request = APIRequestMapper.MapRequestToModel<SystemCreateRequest>(body);
                    var sessionValue = session.Value;
                    var requestValue = request.Value;

                    if (request != null)
                    {
                        var system = new GameSystem(sessionValue.AccountID)
                        {
                            Name = requestValue.Name,
                            Publisher = requestValue.Publisher,
                            Version = requestValue.Version,
                            CharacterFields = requestValue.CharacterFields,
                            CharacterFieldValueProviders = requestValue.CharacterFieldValueProviders
                        };

                        App.GetState().LoadedSystems.Add(system);
                        App.GetState().DB.InsertSystem(system);

                        return Created(Url.ToString(), system);
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
