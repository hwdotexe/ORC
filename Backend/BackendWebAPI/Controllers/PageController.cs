using System;
using System.Collections.Generic;
using System.Globalization;
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

namespace BackendWebAPI.Controllers
{
    [ApiController]
    [Route("v1/page")]
    public class PageController : ControllerBase
    {
        /*
         * TODO: endpoint for adding a folder to a campaign/character (notes can exist outside of these, so they must be added. Client will add automatically)
         */

        [HttpGet("{pageID}")]
        public ActionResult GET_Page(string pageID)
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "GET_PAGE", false))
                {
                    var sessionValue = session.Value;
                    var page = App.GetState().GetPage(Guid.Parse(pageID));

                    if (page != null)
                    {
                        if (page.OwnerAccountID == sessionValue.AccountID || page.Shares.Exists(s => s.AccountID == sessionValue.AccountID))
                        {
                            return Ok(page);
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
                    return StatusCode(429);
                }
            }
            catch (Exception e)
            {
                HTTPServerUtilities.LogServerError(e);

                return StatusCode(500);
            }
        }

        [HttpGet("folder/{folderID}")]
        public ActionResult GET_Page_Folder(string folderID)
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "GET_PAGE_FOLDER", false))
                {
                    var sessionValue = session.Value;
                    var folder = App.GetState().LoadedPageFolders.Find(f => f.FolderID == Guid.Parse(folderID));

                    if (folder != null)
                    {
                        if (folder.OwnerAccountID == sessionValue.AccountID || folder.Shares.Exists(s => s.AccountID == sessionValue.AccountID))
                        {
                            var pages = App.GetState().GetPages(folder.Pages);

                            return Ok(MapPageFolder(sessionValue.AccountID, folder, pages));
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
                    return StatusCode(429);
                }
            }
            catch (Exception e)
            {
                HTTPServerUtilities.LogServerError(e);

                return StatusCode(500);
            }
        }

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
                if (CaptchaService.IsSafeRequest(HttpContext, "LIST_PAGE_FOLDERS", false))
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
                if (CaptchaService.IsSafeRequest(HttpContext, "CREATE_PAGE", false))
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
                if (CaptchaService.IsSafeRequest(HttpContext, "CREATE_PAGE_FOLDER", false))
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

        [HttpPatch]
        public ActionResult PATCH_Update_Page()
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "UPDATE_PAGE", false))
                {
                    var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                    var request = APIRequestMapper.MapRequestToModel<PageUpdateRequest>(body);
                    var sessionValue = session.Value;

                    if (request != null)
                    {
                        var requestValue = request.Value;
                        var page = App.GetState().GetPage(requestValue.PageID);

                        if (page != null)
                        {
                            var isOwner = page.OwnerAccountID == sessionValue.AccountID;
                            var pageShare = page.Shares.Find(s => s.AccountID == sessionValue.AccountID && s.ShareType != ShareType.VIEW);

                            if (isOwner || pageShare != null)
                            {
                                page.Body = requestValue.Body;
                                page.Privacy = requestValue.Privacy;
                                page.Title = requestValue.Title;
                                page.DateModified = DateTimeOffset.Now;

                                App.GetState().DB.UpdatePage(page);

                                return Ok(page);
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


        [HttpDelete("{pageID}")]
        public ActionResult DELETE_Delete_Page(string pageID)
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "DELETE_PAGE", false))
                {
                    var sessionValue = session.Value;
                    var page = App.GetState().GetPage(Guid.Parse(pageID));

                    if (page != null)
                    {
                        var isOwner = page.OwnerAccountID == sessionValue.AccountID;
                        var pageShare = page.Shares.Find(s => s.AccountID == sessionValue.AccountID && s.ShareType == ShareType.FULL);

                        if (isOwner || pageShare != null)
                        {
                            var folder = App.GetState().LoadedPageFolders.Find(f => f.Pages.Contains(page.PageID));

                            if (folder != null)
                            {
                                folder.Pages.Remove(page.PageID);

                                App.GetState().DB.UpdatePageFolder(folder);
                                App.GetState().DeletePage(page.PageID);

                                return Ok();
                            }
                            else
                            {
                                return NotFound();
                            }
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
                    return StatusCode(429);
                }
            }
            catch (Exception e)
            {
                HTTPServerUtilities.LogServerError(e);

                return StatusCode(500);
            }
        }

        [HttpDelete("folder/{folderID}")]
        public ActionResult DELETE_Delete_Folder(string folderID)
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "DELETE_FOLDER", false))
                {
                    var sessionValue = session.Value;
                    var folder = App.GetState().LoadedPageFolders.Find(f => f.FolderID == Guid.Parse(folderID));

                    if (folder != null)
                    {
                        var isOwner = folder.OwnerAccountID == sessionValue.AccountID;
                        var folderShare = folder.Shares.Find(s => s.AccountID == sessionValue.AccountID && s.ShareType == ShareType.FULL);

                        if (isOwner || folderShare != null)
                        {
                            App.GetState().DeletePages(folder.Pages);
                            App.GetState().DB.DeletePageFolder(folder);

                            App.GetState().LoadedPageFolders.Remove(folder);

                            return Ok();
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
                    return StatusCode(429);
                }
            }
            catch (Exception e)
            {
                HTTPServerUtilities.LogServerError(e);

                return StatusCode(500);
            }
        }

        private PageFolderGetResponse MapPageFolder(Guid callerID, PageFolder folder, List<Page> pages)
        {
            var response = new PageFolderGetResponse
            {
                FolderID = folder.FolderID
            };

            response.Pages = pages.FindAll(p => p.OwnerAccountID == callerID || p.Shares.Exists(s => s.AccountID == callerID));

            return response;
        }
    }
}