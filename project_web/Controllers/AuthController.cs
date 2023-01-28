using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using project_web.Enums;
using project_web.Objects;
using System.Security.Claims;
using project_web.DataBase;
using project_web.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace project_web.Controllers
{
    public class AuthController : Controller
    {
        private ApplicationContext db;
        public AuthController(ApplicationContext context)
        {
            db = context;
        }

        [HttpPost]
        [Route("auth/registration")]
        public async Task<AuthInfo> Registration([FromBody] AuthInput input)
        {
            var login = input.Login;
            var password = input.Password;

            var newUser = new User
            {
                UserName = login,
                UserPassword = password,
                Role = RoleType.User.ToString()
            };

            await db.Users.AddAsync(newUser);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                return AuthInfo.Fail(e.Message);
            }

            await SetCookies(login, RoleType.User);
            return AuthInfo.Success(login, RoleType.User);
        }

        [HttpPost]
        [Route("auth/login")]
        public async Task<AuthInfo> Login([FromBody] AuthInput input)
        {
            var login = input.Login;
            var password = input.Password;
            var users = db.Users.Where(p => p.UserName == login);
            var user_check = db.Users.FirstOrDefault(p => p.UserName == login && p.UserPassword == password);
            User user;
            try
            {
                user = users.First();
            }
            catch (InvalidOperationException e)
            {
                return AuthInfo.Fail("Неверный логин или пароль");
            }


            if (user_check != null)
            {
                await SetCookies(login, Role.FromString(user.Role));
                return AuthInfo.Success(login, Role.FromString(user.Role));
            }
            else
            {
                return AuthInfo.Fail("Неверный логин или пароль");
            }
        }

        [HttpGet]
        [Route("auth/logout")]
        public async Task<AuthInfo> Logout()
        {
            await RemoveCookies();
            return GetInfo();
        }
    
        [HttpGet]
        [Route("auth/getInfo")]
        public AuthInfo GetInfo()
        {

            if (User?.Identity?.IsAuthenticated ?? false)
            {
                string role = User.FindFirstValue(ClaimsIdentity.DefaultRoleClaimType);
                RoleType roleType = Role.FromString(role);
                var loginName = User.FindFirstValue(ClaimsIdentity.DefaultNameClaimType);
                return AuthInfo.Success(loginName, roleType);
            }

            return AuthInfo.Fail("");
        }

        #region private
        private async Task SetCookies(string login, RoleType role)
        {
            var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, role.ToString())
                };

            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);

            await AuthenticationHttpContextExtensions.SignInAsync(HttpContext, new ClaimsPrincipal(id));
        }

        private async Task RemoveCookies()
        {
            await AuthenticationHttpContextExtensions.SignOutAsync(HttpContext);
        }
        #endregion
    }
}