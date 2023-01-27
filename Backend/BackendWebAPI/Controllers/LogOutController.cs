using System;
using BackendCore;
using BackendCore.Extensions;
using BackendWebAPI.Core;
using Microsoft.AspNetCore.Mvc;

namespace BackendWebAPI.Controllers
{
    [ApiController]
    [Route("v1/logout")]
    public class LogOutController : ControllerBase
    {
        [HttpPost]
        public ActionResult Post()
        {
            var authToken = HttpContext.GetAuthToken();

            if (authToken == null)
            {
                return BadRequest();
            }

            var session = HttpContext.GetAccountSession();

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
