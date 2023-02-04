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
    [Route("v1/page")]
    public class PageController : ControllerBase
    {
        // TODO: enforce user access to the page (owner? page belongs to object they own?)
        // May need to implement access list like Campaigns
        [HttpGet("{pageID}")]
        public ActionResult GET_Get_Page(string pageID)
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "GET_PAGE"))
                {
                    var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                    var sessionValue = session.Value;

                    try
                    {
                        var pageGuid = Guid.Parse(pageID);
                        var page = FetchPage(pageGuid);

                        if (page != null)
                        {
                            return Ok(page);
                        }
                        else
                        {
                            return NotFound();
                        }
                    }
                    catch (FormatException)
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

        [HttpPut]
        public ActionResult PUT_Create_Page()
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "CREATE_PAGE"))
                {
                    var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                    var request = APIRequestMapper.MapRequestToModel<PageCreateRequest>(body);
                    var sessionValue = session.Value;

                    if (request != null)
                    {
                        var requestValue = request.Value;
                        var page = new Page(requestValue.Title, sessionValue.AccountID, requestValue.Privacy);

                        App.GetState().DB.InsertPage(page);

                        return Created(Url.ToString(), page);
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

        [HttpPost]
        public ActionResult POST_Update_Page()
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "UPDATE_PAGE"))
                {
                    var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                    var request = APIRequestMapper.MapRequestToModel<PageUpdateRequest>(body);
                    var sessionValue = session.Value;

                    if (request != null)
                    {
                        var requestValue = request.Value;
                        var page = FetchPage(requestValue.PageID);

                        if (page != null)
                        {
                            page.Title = requestValue.Title;
                            page.Body = requestValue.Body;
                            page.Privacy = requestValue.Privacy;

                            App.GetState().DB.UpdatePage(page);

                            return Ok();
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

        private Page FetchPage(Guid pageID)
        {
            var cached = App.GetState().CachedPages.Find(p => p.PageID == pageID);

            if (cached != null)
            {
                return cached;
            }
            else
            {
                var pageFromDB = App.GetState().DB.GetPage(pageID);

                if (pageFromDB != null)
                {
                    App.GetState().CachedPages.Add(pageFromDB);
                }

                return pageFromDB;
            }
        }
    }
}
