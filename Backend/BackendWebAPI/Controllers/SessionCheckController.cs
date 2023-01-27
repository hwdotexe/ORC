using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Core;
using BackendAPI.Mappers;
using BackendCore;
using BackendCore.Extensions;
using BackendCore.Models;
using BackendCore.Models.API;
using BackendCore.Models.Enum;
using BackendWebAPI.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace BackendWebAPI.Controllers
{
    [ApiController]
    [Route("v1/sessioncheck")]
    public class SessionCheckController : ControllerBase
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
