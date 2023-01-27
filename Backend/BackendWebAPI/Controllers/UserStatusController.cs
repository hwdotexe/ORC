using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Core;
using BackendAPI.Mappers;
using BackendCore;
using BackendCore.Database.Models;
using BackendCore.Extensions;
using BackendCore.Models;
using BackendCore.Models.API.Request;
using BackendCore.Models.API.Response;
using BackendCore.Models.Enum;
using BackendCore.Services;
using BackendWebAPI.Core;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace BackendWebAPI.Controllers
{
    [ApiController]
    [Route("v1/user/status")]
    public class UserStatusController : ControllerBase
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
                    List<User> users = App.GetState().DB.GetUsers();

                    return Ok(users);
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
                var sessionValue = session.Value;
                var user = App.GetState().LoadedUsers.Find(user => user.UserID == sessionValue.UserID);

                if (user.GetAccountType() == UserAccountType.ADMIN)
                {
                    var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                    var request = APIRequestMapper.MapRequestToModel<UserControlRequest>(body);

                    if (request != null)
                    {
                        var requestValue = request.Value;

                        if (user.UserID != requestValue.UserID)
                        {
                            var targetUser = App.GetState().DB.GetUser(requestValue.UserID);

                            if (targetUser != null)
                            {
                                targetUser.AccountStatus = requestValue.AccountStatus;

                                if (requestValue.AccountStatus == UserAccountStatus.DISABLED)
                                {
                                    App.GetState().Auth.InvalidateSessions(targetUser.UserID);
                                }

                                App.GetState().DB.UpdateUser(targetUser);

                                return Ok();
                            }
                            else
                            {
                                return NotFound();
                            }
                        }
                        else
                        {
                            return Conflict();
                        }
                    }
                    else
                    {
                        return BadRequest();
                    }
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
    }
}
