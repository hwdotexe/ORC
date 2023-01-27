using System;
using BackendAPI.Mappers;
using BackendCore;
using BackendCore.Database.Models;
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
    [Route("v1/user")]
    public class UserController : ControllerBase
    {
        [HttpPost]
        public ActionResult Post()
        {
            try
            {
                var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                var request = APIRequestMapper.MapRequestToModel<UserAuthRequest>(body);

                if (request != null)
                {
                    var requestValue = request.Value;

                    if (CaptchaService.IsSafeRequest(HttpContext, "POST_LOGIN"))
                    {
                        if (Validators.ValidateEmail(requestValue.Email))
                        {
                            var authResult = App.GetState().Auth.Authenticate(requestValue.Email, requestValue.Password);

                            if (authResult != null)
                            {
                                var resultValue = authResult.Value;
                                var user = App.GetState().DB.GetUser(resultValue.UserID);

                                if (user != null)
                                {
                                    if (user.AccountStatus == UserAccountStatus.ENABLED)
                                    {
                                        App.GetState().LoadedUsers.Add(user);

                                        var responseObj = new UserAuthResponse()
                                        {
                                            AuthToken = resultValue.AuthToken,
                                            UserID = user.UserID,
                                            UserAvatarURL = user.CharacterAvatarURL,
                                            UserName = user.CharacterName,
                                            UserServer = user.CharacterServer,
                                            AccountType = user.GetAccountType().ToString()
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

        [HttpPut]
        public ActionResult Put()
        {
            try
            {
                var body = HTTPServerUtilities.GetHTTPRequestBody(HttpContext.Request);
                var request = APIRequestMapper.MapRequestToModel<UserCreateRequest>(body);

                if (request != null)
                {
                    var requestValue = request.Value;
                    var captchaRiskScore = CaptchaService.GetScore(requestValue.CaptchaToken, "PUT_REGISTER");

                    if (captchaRiskScore > 0.5)
                    {
                        if (Validators.ValidateEmail(requestValue.Email) && Validators.ValidatePassword(requestValue.Password))
                        {
                            if (!App.GetState().Auth.UserExists(requestValue.Email))
                            {
                                var storedAccountToken = App.GetState().DB.GetAccountToken(requestValue.CreateAccountToken);
                                var userCount = App.GetState().DB.GetUsers().Count;

                                if (storedAccountToken != null || userCount == 0)
                                {
                                    var accountType = storedAccountToken?.AccountType ?? UserAccountType.ADMIN;
                                    var user = new User(requestValue.CharacterName, requestValue.CharacterServer, accountType);
                                    var token = App.GetState().Auth.CreateSession(user.UserID);
                                    var avatarURL = UserService.ExtractAvatarURL(requestValue.CharacterName, requestValue.CharacterServer);

                                    user.CharacterAvatarURL = avatarURL;

                                    App.GetState().DB.InsertUser(user);
                                    App.GetState().DB.InsertLoginData(new LoginData
                                    {
                                        UserID = user.UserID,
                                        LoginEmail = requestValue.Email,
                                        PasswordHash = App.GetState().Auth.GenerateHash(requestValue.Password)
                                    });

                                    if (storedAccountToken != null)
                                    {
                                        App.GetState().DB.DeleteAccountToken(storedAccountToken.TokenID.ToString());
                                    }

                                    App.GetState().LoadedUsers.Add(user);

                                    var responseObj = new UserAuthResponse()
                                    {
                                        AuthToken = token,
                                        UserID = user.UserID,
                                        UserAvatarURL = user.CharacterAvatarURL,
                                        UserName = user.CharacterName,
                                        UserServer = user.CharacterServer,
                                        AccountType = user.GetAccountType().ToString()
                                    };

                                    return Created(Url.ToString(), responseObj);
                                }
                                else
                                {
                                    return Unauthorized();
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
                var request = APIRequestMapper.MapRequestToModel<UserUpdateRequest>(body);
                var sessionValue = session.Value;

                if (request != null)
                {
                    var requestValue = request.Value;
                    var user = App.GetState().LoadedUsers.Find(user => user.UserID == sessionValue.UserID);

                    user.CharacterName = requestValue.CharacterName;
                    user.CharacterServer = requestValue.CharacterServer;
                    user.CharacterAvatarURL = UserService.ExtractAvatarURL(user.CharacterName, user.CharacterServer);

                    App.GetState().DB.UpdateUser(user);

                    var responseObj = new UserUpdateResponse()
                    {
                        CharacterName = user.CharacterName,
                        AvatarURL = user.CharacterAvatarURL
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
