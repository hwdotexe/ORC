using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Core;
using BackendAPI.Mappers;
using BackendCore;
using BackendCore.Database.Models;
using BackendCore.Extensions;
using BackendCore.Models.API;
using BackendCore.Models.Enum;
using BackendWebAPI.Core;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace BackendWebAPI.Controllers
{
    [ApiController]
    [Route("v1/logout")]
    public class LogOutController : ControllerBase
    {
        [HttpPost]
        public ActionResult Post()
        {
            var authToken = HttpContext.GetUserAuthToken();

            if (authToken == null)
            {
                return BadRequest();
            }

            var session = HttpContext.GetUserSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                App.GetState().Auth.InvalidateSession(authToken);

                return Ok();
            }
            catch (Exception e)
            {
                HTTPServerUtilities.LogServerError(e);

                return StatusCode(500);
            }
        }
    }
}
