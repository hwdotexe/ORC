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
    [Route("v1/campaign")]
    public class CampaignController : ControllerBase
    {
        [HttpGet]
        public ActionResult GET_List_Campaigns()
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "LIST_CAMPAIGNS"))
                {
                    var sessionValue = session.Value;
                    var campaigns = App.GetState().LoadedCampaigns.FindAll(c => c.Players.Exists(p => p.AccountID == sessionValue.AccountID));

                    return Ok(campaigns);
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
        public ActionResult PUT_Create_Campaign()
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "CREATE_CAMPAIGN"))
                {
                    var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                    var request = APIRequestMapper.MapRequestToModel<CampaignCreateRequest>(body);
                    var sessionValue = session.Value;

                    if (request != null)
                    {
                        var requestValue = request.Value;
                        var system = App.GetState().LoadedSystems.Find(s => s.SystemID == requestValue.System);

                        if (system != null)
                        {
                            var campaign = new Campaign(requestValue.Name, requestValue.Description, sessionValue.AccountID, system.SystemID);

                            App.GetState().LoadedCampaigns.Add(campaign);
                            App.GetState().DB.InsertCampaign(campaign);

                            return Created(Url.ToString(), campaign);
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

        // TODO: Move player/account management to its own controller?
        // TODO: Add a way to change owner?
        [HttpPost]
        public ActionResult POST_Add_Player()
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "ADD_PLAYER"))
                {
                    var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                    var request = APIRequestMapper.MapRequestToModel<CampaignAccountAddRequest>(body);
                    var sessionValue = session.Value;

                    if (request != null)
                    {
                        var requestValue = request.Value;
                        var campaign = App.GetState().LoadedCampaigns.Find(c => c.CampaignID == requestValue.CampaignID);

                        if (campaign != null)
                        {
                            var callerPlayer = campaign.Players.Find(p => p.AccountID == sessionValue.AccountID);

                            if (callerPlayer != null)
                            {
                                if (callerPlayer.Role == PlayerRole.GameMaster || callerPlayer.Role == PlayerRole.Owner)
                                {
                                    if (requestValue.PlayerType != PlayerRole.Owner)
                                    {
                                        campaign.Players.Add(new CampaignPlayer(requestValue.AccountID, requestValue.PlayerType));

                                        App.GetState().DB.UpdateCampaign(campaign);

                                        return Ok();
                                    }
                                    else
                                    {
                                        return Conflict();
                                    }
                                }
                                else
                                {
                                    return Unauthorized();
                                }
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
