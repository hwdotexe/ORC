using System;
using BackendAPI.Mappers;
using BackendCore;
using BackendCore.Extensions;
using BackendCore.Models;
using BackendCore.Models.API.Request;
using BackendCore.Models.Enum;
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

        [HttpPut("campaign/{campaignID}")]
        public ActionResult PUT_Create_Page_Campaign(string campaignID)
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
                    var campaign = App.GetState().LoadedCampaigns.Find(c => c.CampaignID == Guid.Parse(campaignID) && c.Players.Exists(p => p.AccountID == sessionValue.AccountID));

                    if (request != null)
                    {
                        if (campaign != null)
                        {
                            var playerRole = campaign.Players.Find(p => p.AccountID == sessionValue.AccountID).Role;

                            if (playerRole != PlayerRole.Player)
                            {
                                var requestValue = request.Value;
                                var folder = campaign.PageFolders.Find(f => f.FolderID == requestValue.FolderID);

                                if (folder != null)
                                {
                                    var page = new Page(requestValue.Title, sessionValue.AccountID, requestValue.Privacy);

                                    folder.Pages.Add(page.PageID);
                                    App.GetState().DB.InsertPage(page);
                                    App.GetState().DB.UpdateCampaign(campaign);

                                    return Created(Url.ToString(), page);
                                }
                                else
                                {
                                    return NotFound();
                                }
                            }
                            else
                            {
                                // TODO test this - does it cause errors?
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

        [HttpPut("campaign/{campaignID}/folder")]
        public ActionResult PUT_Create_Page_Campaign_Folder(string campaignID)
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "CREATE_PAGE_FOLDER"))
                {
                    var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                    var request = APIRequestMapper.MapRequestToModel<PageFolderCreateRequest>(body);
                    var sessionValue = session.Value;
                    var campaign = App.GetState().LoadedCampaigns.Find(c => c.CampaignID == Guid.Parse(campaignID) && c.Players.Exists(p => p.AccountID == sessionValue.AccountID));

                    if (request != null)
                    {
                        if (campaign != null)
                        {
                            var playerRole = campaign.Players.Find(p => p.AccountID == sessionValue.AccountID).Role;

                            if (playerRole != PlayerRole.Player)
                            {
                                var requestValue = request.Value;
                                var folder = new PageFolder(requestValue.Name, requestValue.Privacy);

                                campaign.PageFolders.Add(folder);
                                App.GetState().DB.UpdateCampaign(campaign);

                                return Created(Url.ToString(), folder);
                            }
                            else
                            {
                                // TODO test this - does it cause errors?
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

        [HttpPut("character/{characterID}")]
        public ActionResult PUT_Create_Page_Character(string characterID)
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
                    var character = App.GetState().LoadedCharacters.Find(c => c.CharacterID == Guid.Parse(characterID) && c.OwnerAccountID == sessionValue.AccountID);

                    if (request != null)
                    {
                        if (character != null)
                        {
                            var requestValue = request.Value;
                            var folder = character.PageFolders.Find(f => f.FolderID == requestValue.FolderID);

                            if (folder != null)
                            {
                                var page = new Page(requestValue.Title, sessionValue.AccountID, requestValue.Privacy);

                                folder.Pages.Add(page.PageID);
                                App.GetState().DB.InsertPage(page);
                                App.GetState().DB.UpdateCharacter(character);

                                return Created(Url.ToString(), page);
                            }
                            else
                            {
                                return NotFound();
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

        [HttpPut("character/{characterID}/folder")]
        public ActionResult PUT_Create_Page_Character_Folder(string characterID)
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "CREATE_PAGE_FOLDER"))
                {
                    var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                    var request = APIRequestMapper.MapRequestToModel<PageFolderCreateRequest>(body);
                    var sessionValue = session.Value;
                    var character = App.GetState().LoadedCharacters.Find(c => c.CharacterID == Guid.Parse(characterID) && c.OwnerAccountID == sessionValue.AccountID);

                    if (request != null)
                    {
                        if (character != null)
                        {
                            var requestValue = request.Value;
                            var folder = new PageFolder(requestValue.Name, requestValue.Privacy);

                            character.PageFolders.Add(folder);
                            App.GetState().DB.UpdateCharacter(character);

                            return Created(Url.ToString(), folder);
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
