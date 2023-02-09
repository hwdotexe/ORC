using System;
using System.Globalization;
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
        /*
         * Updating pages will require permission checks.
         * Creating a folder - Different endpoint for Campaign/Character?
         * 
         */

        [HttpGet]
        public ActionResult GET_List_Page_Folders()
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "LIST_PAGE_FOLDERS"))
                {
                    var sessionValue = session.Value;

                    var folders = App.GetState().LoadedPageFolders.FindAll(pf => pf.OwnerAccountID == sessionValue.AccountID || pf.Shares.Exists(s => s.AccountID == sessionValue.AccountID));

                    return Ok(folders);
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
                        var folder = App.GetState().LoadedPageFolders.Find(pf => pf.FolderID == requestValue.FolderID);

                        if (folder != null)
                        {
                            var isOwner = folder.OwnerAccountID == sessionValue.AccountID;
                            var folderShare = folder.Shares.Find(s => s.AccountID == sessionValue.AccountID && s.ShareType != ShareType.VIEW);

                            if (isOwner || folderShare != null)
                            {
                                var page = new Page(requestValue.Title, folder.OwnerAccountID, requestValue.Privacy);

                                // If this user does not own the folder, share this note with them in full.
                                if (!isOwner)
                                {
                                    page.Shares.Add(new Share(sessionValue.AccountID, ShareType.FULL));
                                }

                                folder.Pages.Add(page.PageID);
                                App.GetState().DB.InsertPage(page);
                                App.GetState().DB.UpdatePageFolder(folder);

                                return Created(Url.ToString(), page);
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

        // TODO this might be temporary or permanent, who knows!
        // Might be possible to dispatch another request to add it to a campaign or character.
        [HttpPut("folder")]
        public ActionResult PUT_Create_Page_Folder()
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

                    if (request != null)
                    {
                        var requestValue = request.Value;
                        var folder = new PageFolder(sessionValue.AccountID, requestValue.Name);

                        App.GetState().LoadedPageFolders.Add(folder);
                        App.GetState().DB.InsertPageFolder(folder);

                        return Created(Url.ToString(), folder);
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
    }
}