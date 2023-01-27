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
    [Route("v1/review")]
    public class ReviewController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                List<ReviewUserModel> reviews = new List<ReviewUserModel>();

                foreach (var review in App.GetState().Reviews)
                {
                    var user = App.GetState().LoadedUsers.Find(user => user.UserID == review.UserID) ?? App.GetState().DB.GetUser(review.UserID);

                    reviews.Add(new ReviewUserModel(review, user));
                }

                return Ok(reviews);

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
            var session = HttpContext.GetUserSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                var request = APIRequestMapper.MapRequestToModel<CreateReviewRequest>(body);
                var sessionValue = session.Value;

                if (request != null)
                {
                    var requestValue = request.Value;
                    var user = App.GetState().LoadedUsers.Find(user => user.UserID == sessionValue.UserID);

                    if (requestValue.StarRating % 0.5 == 0)
                    {
                        var newReview = new Review(
                            user.UserID,
                            requestValue.Title,
                            requestValue.ClubName,
                            requestValue.ClubDatacenter,
                            requestValue.ClubServer,
                            requestValue.ClubDistrict,
                            requestValue.ClubWard,
                            requestValue.ClubPlot,
                            BuildUTCClubHours(requestValue.ClubHours),
                            requestValue.Summary,
                            requestValue.StarRating,
                            requestValue.Website,
                            requestValue.Tags
                            );

                        App.GetState().DB.InsertReview(newReview);
                        App.GetState().Reviews.Insert(0, newReview);

                        var responseObj = new ReviewResponse()
                        {
                            ReviewID = newReview.ReviewID.ToString()
                        };

                        return Created(Url.ToString(), responseObj);
                    }
                    else
                    {
                        return BadRequest();
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
        public ActionResult Patch()
        {
            var session = HttpContext.GetUserSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                var request = APIRequestMapper.MapRequestToModel<EditReviewRequest>(body);
                var sessionValue = session.Value;

                if (request != null)
                {
                    var requestValue = request.Value;
                    var user = App.GetState().LoadedUsers.Find(user => user.UserID == sessionValue.UserID);
                    var review = App.GetState().Reviews.Find(r => r.ReviewID == requestValue.ReviewID);

                    if (review != null)
                    {
                        if (user.GetAccountType() == UserAccountType.ADMIN || user.GetAccountType() == UserAccountType.MODERATOR || (review.UserID == user.UserID))
                        { 
                            review.ReviewTitle = requestValue.Title;
                            review.ClubName = requestValue.ClubName;
                            review.ClubDatacenter = requestValue.ClubDatacenter;
                            review.ClubServer = requestValue.ClubServer;
                            review.ClubDistrict = requestValue.ClubDistrict;
                            review.ClubWard = requestValue.ClubWard;
                            review.ClubPlot = requestValue.ClubPlot;
                            review.ClubHours = BuildUTCClubHours(requestValue.ClubHours);
                            review.Summary = requestValue.Summary;
                            review.StarRating = requestValue.StarRating;
                            review.Website = requestValue.Website;
                            review.Tags = requestValue.Tags;

                            App.GetState().DB.UpdateReview(review);

                            var responseObj = new ReviewResponse()
                            {
                                ReviewID = review.ReviewID.ToString()
                            };

                            return Ok(responseObj);
                        }
                        else
                        {
                            return Forbid();
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
                var request = APIRequestMapper.MapRequestToModel<DeleteReviewRequest>(body);
                var sessionValue = session.Value;
                var user = App.GetState().LoadedUsers.Find(user => user.UserID == sessionValue.UserID);

                if (request != null)
                {
                    var requestValue = request.Value;
                    var review = App.GetState().Reviews.Find(r => r.ReviewID == requestValue.ReviewID);

                    if (review != null)
                    {
                        if (user.GetAccountType() == UserAccountType.ADMIN || user.GetAccountType() == UserAccountType.MODERATOR || (review.UserID == user.UserID))
                        {
                            App.GetState().DB.DeleteReview(review);
                            App.GetState().Reviews.Remove(review);

                            var responseObj = new ReviewResponse()
                            {
                                ReviewID = review.ReviewID.ToString()
                            };

                            return Ok(responseObj);
                        }
                        else
                        {
                            return Forbid();
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


        private List<ClubHours> BuildUTCClubHours(List<CreateReviewHoursRequest> hours)
        {
            List<ClubHours> result = new List<ClubHours>();

            foreach(var hoursRequest in hours)
            {
                if(hoursRequest.VariableDay != null)
                {
                    result.Add(new ClubHours
                    {
                        VariableDay = hoursRequest.VariableDay,
                        VariableTimes = hoursRequest.VariableTimes
                    });

                    continue;
                }

                var timezone = TimeZoneInfo.FindSystemTimeZoneById(hoursRequest.TimezoneID);
                var timeOpen = DateTime.Parse(hoursRequest.Open);
                var timeClose = DateTime.Parse(hoursRequest.Close);

                var timeOpenUTC = TimeZoneInfo.ConvertTimeToUtc(timeOpen, timezone);
                var timeCloseUTC = TimeZoneInfo.ConvertTimeToUtc(timeClose, timezone);

                result.Add(new ClubHours
                {
                    Day = hoursRequest.Day.ToString(),
                    Open = timeOpenUTC.ToString("O"),
                    Close = timeCloseUTC.ToString("O"),
                });
            }

            return result;
        }
    }
}
