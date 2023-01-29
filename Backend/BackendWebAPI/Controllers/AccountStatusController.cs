using System;
using System.Collections.Generic;
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
    [Route("v1/account/status")]
    public class AccountStatusController : ControllerBase
    {
        [HttpGet]
        public ActionResult GET_List_Accounts()
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "LIST_ACCOUNTS"))
                {
                    var sessionValue = session.Value;
                    var account = App.GetState().LoadedAccounts.Find(account => account.AccountID == sessionValue.AccountID);

                    if (account.AccountType == AccountType.ADMIN)
                    {
                        List<Account> accounts = App.GetState().DB.GetAccounts();

                        return Ok(accounts);
                    }
                    else
                    {
                        return Unauthorized();
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
        public ActionResult POST_Update_Account_Status()
        {
            var session = HttpContext.GetAccountSession();

            if (session == null)
            {
                return Unauthorized();
            }

            try
            {
                if (CaptchaService.IsSafeRequest(HttpContext, "UPDATE_ACCOUNT_STATUS"))
                {
                    var sessionValue = session.Value;
                    var account = App.GetState().LoadedAccounts.Find(a => a.AccountID == sessionValue.AccountID);

                    if (account.AccountType == AccountType.ADMIN)
                    {
                        var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                        var request = APIRequestMapper.MapRequestToModel<AccountStatusChangeRequest>(body);

                        if (request != null)
                        {
                            var requestValue = request.Value;

                            if (account.AccountID != requestValue.TargetAccountID)
                            {
                                var targetAccount = App.GetState().DB.GetAccount(requestValue.TargetAccountID);

                                if (targetAccount != null)
                                {
                                    targetAccount.AccountStatus = requestValue.NewAccountStatus;

                                    if (requestValue.NewAccountStatus == AccountStatus.DISABLED)
                                    {
                                        App.GetState().Auth.InvalidateSessions(targetAccount.AccountID);
                                    }

                                    App.GetState().DB.UpdateAccount(targetAccount);

                                    return Ok();
                                }
                                else
                                {
                                    return NotFound();
                                }
                            }
                            else
                            {
                                return Conflict();
                            }
                        }
                        else
                        {
                            return BadRequest();
                        }
                    }
                    else
                    {
                        return Unauthorized();
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
