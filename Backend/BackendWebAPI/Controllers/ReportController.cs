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
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace BackendWebAPI.Controllers
{
    [ApiController]
    [Route("v1/review/report")]
    public class ReportController : ControllerBase
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

                if (user.GetAccountType() == UserAccountType.ADMIN || user.GetAccountType() == UserAccountType.MODERATOR)
                {
                    List<Report> reports = App.GetState().Reports;

                    return Ok(reports);
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

        [HttpPut]
        public ActionResult Put()
        {
            try
            {
                var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                var request = APIRequestMapper.MapRequestToModel<ReportCreateRequest>(body);

                if (request != null)
                {
                    var requestValue = request.Value;

                    var captchaRiskScore = CaptchaService.GetScore(requestValue.CaptchaToken, "PUT_REPORT");

                    if (captchaRiskScore > 0.5)
                    {
                        var review = App.GetState().Reviews.Find(review => review.ReviewID == requestValue.ReviewID);

                        if (review != null)
                        {
                            var report = new Report(review.ReviewID, requestValue.ReportReason, requestValue.CharacterName, requestValue.CharacterServer, requestValue.Contact);

                            App.GetState().Reports.Add(report);
                            App.GetState().DB.InsertReport(report);

                            var responseObj = new ReportCreateResponse()
                            {
                                ReportID = report.ReportID.ToString()
                            };

                            return Created(Url.ToString(), responseObj);
                        }
                        else
                        {
                            return NotFound();
                        }
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
                var request = APIRequestMapper.MapRequestToModel<ReportDeleteRequest>(body);
                var sessionValue = session.Value;
                var user = App.GetState().LoadedUsers.Find(user => user.UserID == sessionValue.UserID);

                if (request != null)
                {
                    var requestValue = request.Value;
                    var report = App.GetState().Reports.Find(r => r.ReportID == requestValue.ReportID);

                    if (report != null)
                    {
                        if (user.GetAccountType() == UserAccountType.ADMIN || user.GetAccountType() == UserAccountType.MODERATOR)
                        {
                            App.GetState().Reports.Remove(report);
                            App.GetState().DB.DeleteReport(report);

                            return Ok();
                        }
                        else
                        {
                            return Unauthorized();
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
            catch (Exception e)
            {
                HTTPServerUtilities.LogServerError(e);

                return StatusCode(500);
            }
        }
    }
}
