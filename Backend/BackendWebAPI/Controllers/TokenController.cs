using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Core;
using BackendAPI.Mappers;
using BackendCore;
using BackendCore.Database.Models;
using BackendCore.Extensions;
using BackendCore.Models.API.Request;
using BackendCore.Models.API.Response;
using BackendCore.Models.Enum;
using BackendWebAPI.Core;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace BackendWebAPI.Controllers
{
    [ApiController]
    [Route("v1/token")]
    public class TokenController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {
            var session = HttpContext.GetUserSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                var sessionValue = session.Value;
                var user = App.GetState().LoadedUsers.Find(user => user.UserID == sessionValue.UserID);

                if (user.GetAccountType() == UserAccountType.ADMIN)
                {
                    var tokens = App.GetState().DB.GetAccountTokens();

                    return Ok(tokens);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception e)
            {
                HTTPServerUtilities.LogServerError(e);

                return StatusCode(500);
            }
        }

        [HttpPost]
        public ActionResult Post()
        {
            var session = HttpContext.GetUserSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                var request = APIRequestMapper.MapRequestToModel<CreateAccountTokenRequest>(body);
                var sessionValue = session.Value;

                if (request != null)
                {
                    var requestValue = request.Value;
                    var user = App.GetState().LoadedUsers.Find(user => user.UserID == sessionValue.UserID);

                    if (user.GetAccountType() == UserAccountType.ADMIN)
                    {
                        var randomToken = App.GetState().Auth.GenerateRandomToken();
                        var accountToken = new CreateAccountToken(randomToken, requestValue.AccountType);

                        App.GetState().DB.InsertAccountToken(accountToken);

                        return Created(Url.ToString(), accountToken);
                    }
                    else
                    {
                        return Unauthorized();
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

        [HttpDelete]
        public ActionResult Delete()
        {
            var session = HttpContext.GetUserSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                var request = APIRequestMapper.MapRequestToModel<DeleteAccountTokenRequest>(body);
                var sessionValue = session.Value;

                if (request != null)
                {
                    var requestValue = request.Value;
                    var user = App.GetState().LoadedUsers.Find(user => user.UserID == sessionValue.UserID);

                    if (user.GetAccountType() == UserAccountType.ADMIN)
                    {
                        App.GetState().DB.DeleteAccountToken(requestValue.TokenID.ToString());

                        return Ok();
                    }
                    else
                    {
                        return Unauthorized();
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
    }
}
