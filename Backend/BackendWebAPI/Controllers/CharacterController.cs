using System;
using BackendAPI.Mappers;
using BackendCore;
using BackendCore.Extensions;
using BackendCore.Models.API.Request;
using BackendCore.Models.API.Response;
using BackendCore.Models.Enum;
using BackendCore.Services;
using BackendWebAPI.Core;
using Microsoft.AspNetCore.Mvc;

namespace BackendWebAPI.Controllers
{
    [ApiController]
    [Route("v1/character")]
    public class CharacterController : ControllerBase
    {
        [HttpPut]
        public ActionResult PUT_Create_Character()
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                var request = APIRequestMapper.MapRequestToModel<AccountCreateRequest>(body);
                var sessionValue = session.Value;

                if (request != null)
                {
                    var requestValue = request.Value;

                    if (CaptchaService.IsSafeRequest(HttpContext, "CREATE_CHARACTER"))
                    {
                        var account = App.GetState().LoadedAccounts.Find(a => a.AccountID == sessionValue.AccountID);

                        // TODO: implement this

                        return StatusCode(501);
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

        [HttpPost]
        public ActionResult POST_Login()
        {
            try
            {
                var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                var request = APIRequestMapper.MapRequestToModel<AccountLoginRequest>(body);

                if (request != null)
                {
                    var requestValue = request.Value;

                    if (CaptchaService.IsSafeRequest(HttpContext, "LOGIN"))
                    {
                        if (Validators.ValidateEmail(requestValue.Email))
                        {
                            var authResult = App.GetState().Auth.Authenticate(requestValue.Email, requestValue.Password);

                            if (authResult != null)
                            {
                                var resultValue = authResult.Value;
                                var account = App.GetState().DB.GetAccount(resultValue.AccountID);

                                if (account != null)
                                {
                                    if (account.AccountStatus == AccountStatus.ENABLED)
                                    {
                                        App.GetState().LoadedAccounts.Add(account);

                                        var responseObj = new AccountAuthenticatedResponse()
                                        {
                                            AuthToken = resultValue.AuthToken,
                                            AccountID = account.AccountID,
                                            DisplayName = account.DisplayName,
                                            AccountType = account.AccountType.ToString()
                                        };

                                        return Ok(responseObj);
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
                                return Unauthorized();
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
        public ActionResult PATCH_Update_Account()
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                var request = APIRequestMapper.MapRequestToModel<AccountUpdateRequest>(body);
                var sessionValue = session.Value;

                if (request != null)
                {
                    var requestValue = request.Value;
                    var account = App.GetState().LoadedAccounts.Find(a => a.AccountID == sessionValue.AccountID);

                    account.DisplayName = requestValue.DisplayName;

                    App.GetState().DB.UpdateAccount(account);

                    var responseObj = new AccountUpdateResponse()
                    {
                        DisplayName = account.DisplayName
                    };

                    return Ok(responseObj);
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
