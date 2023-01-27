using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Core;
using BackendAPI.Mappers;
using BackendCore;
using BackendCore.Extensions;
using BackendCore.Models;
using BackendCore.Models.API.Request;
using BackendCore.Models.API.Response;
using BackendCore.Models.Enum;
using BackendCore.Services;
using BackendWebAPI.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace BackendWebAPI.Controllers
{
    [ApiController]
    [Route("v1/review/request")]
    public class RequestController : ControllerBase
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

                if (user.GetAccountType() == UserAccountType.ADMIN || user.GetAccountType() == UserAccountType.MODERATOR || user.GetAccountType() == UserAccountType.REVIEWER)
                {
                    List<Request> requests = App.GetState().Requests;

                    return Ok(requests);
                }
                else
                {
                    return Forbid();
                }
            }
            catch (Exception e)
            {
                HTTPServerUtilities.LogServerError(e);

                return StatusCode(500);
            }
        }

        [HttpPut]
        public ActionResult Put()
        {
            try
            {
                var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                var request = APIRequestMapper.MapRequestToModel<RequestReviewRequest>(body);

                if (request != null)
                {
                    var requestValue = request.Value;
                    var captchaRiskScore = CaptchaService.GetScore(requestValue.CaptchaToken, "PUT_REQUEST_REVIEW");

                    if (captchaRiskScore > 0.5)
                    {
                        var newRequest = new Request(
                            requestValue.RequestorServer,
                            requestValue.RequestorName,
                            requestValue.ClubName,
                            requestValue.ClubDatacenter,
                            requestValue.ClubServer,
                            requestValue.ClubDistrict,
                            requestValue.ClubWard,
                            requestValue.ClubPlot,
                            requestValue.ClubHours,
                            requestValue.ClubWebsite,
                            requestValue.Info);

                        App.GetState().DB.InsertRequest(newRequest);
                        App.GetState().Requests.Add(newRequest);

                        var responseObj = new RequestResponse()
                        {
                            RequestID = newRequest.RequestID.ToString()
                        };

                        return Created(Url.ToString(), responseObj);
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
                var request = APIRequestMapper.MapRequestToModel<DeleteRequestRequest>(body);
                var sessionValue = session.Value;
                var user = App.GetState().LoadedUsers.Find(user => user.UserID == sessionValue.UserID);

                if (user.GetAccountType() == UserAccountType.ADMIN || user.GetAccountType() == UserAccountType.MODERATOR || user.GetAccountType() == UserAccountType.REVIEWER)
                {
                    if (request != null)
                    {
                        var requestValue = request.Value;
                        var requestItem = App.GetState().Requests.Find(r => r.RequestID == requestValue.RequestID);

                        if (requestItem != null)
                        {
                            App.GetState().DB.DeleteRequest(requestItem);
                            App.GetState().Requests.Remove(requestItem);

                            var responseObj = new RequestResponse()
                            {
                                RequestID = requestItem.RequestID.ToString()
                            };

                            return Ok(responseObj);
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
                    return Forbid();
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
