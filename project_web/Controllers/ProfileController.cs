    using System.Security.Claims;
using project_web.DataBase;
using project_web.Models;
using project_web.Objects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace project_web.Controllers
{
    public class ProfileController : Controller
    {

        public ProfileController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet]
        [Route("api/user/")]
        public async Task<UserInfo> GetUserProfile()
        {
            var user = GetUser(string.Empty);

            if (user == null) return UserInfo.Fail("No such a user");

            if (user.UserProfile == null)
            {
                var newProfile = new UserProfile { User = user };
                user.UserProfile = newProfile;
                db.Users.Update(user);
                await db.UsersProfile.AddAsync(newProfile);
                try
                {
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateException e)
                {
                    return UserInfo.Fail(e.Message);
                }
            }

            return UserInfo.Success(user);
        }

        [HttpGet]
        [Route("api/user/{*profile}")]
        public async Task<UserInfo> GetUserProfile(string? profile)
        {
            var user = GetUser(profile);

            if (user == null) return UserInfo.Fail("No such a user");

            if (user.UserProfile == null)
            {
                var newProfile = new UserProfile { User = user };
                user.UserProfile = newProfile;
                db.Users.Update(user);
                await db.UsersProfile.AddAsync(newProfile);
                try
                {
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateException e)
                {
                    return UserInfo.Fail(e.Message);
                }
            }

            return UserInfo.Success(user);
        }

        [HttpPost]
        [Route("api/user")]
        public async Task<UserInfo> EditProfile ([FromBody] ProfileInput input)
        {
            if (!(User?.Identity?.IsAuthenticated ?? false))
            {
                UserInfo.Fail("Permission Error");
            }
            var user = GetUser(null);

            if (user == null) return UserInfo.Fail("No such a user");

            if (user.UserProfile == null)
            {
                var newProfile = new UserProfile { User = user };
                ProfileInput.CopyToModel(input, newProfile);
                user.UserProfile = newProfile;
                db.Users.Update(user);
                await db.UsersProfile.AddAsync(newProfile);
            }
            else
            {
                var userProfile = user.UserProfile;
                ProfileInput.CopyToModel(input, userProfile);
                db.UsersProfile.Update(userProfile);
            }
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                return UserInfo.Fail(e.Message);
            }

            return await GetUserProfile(null);
        }

        #region private

        private ApplicationContext db;

        private User? GetUser(string? userName)
        {
            if (string.IsNullOrEmpty(userName))
            {
                if (!(User?.Identity?.IsAuthenticated ?? false)) return null;

                userName = User.FindFirstValue(ClaimsIdentity.DefaultNameClaimType);
            }
            var users = db.Users.Where(p => p.UserName == userName).Include(u => u.UserProfile);
            User user;
            try
            {
                user = users.First();
            }
            catch (InvalidOperationException e)
            {
                return null;
            }

            return user;

        }
    }
}
#endregion