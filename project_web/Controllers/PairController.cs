using System.Security.Claims;
using project_web.DataBase;
using project_web.Models;
using project_web.Objects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace project_web.Controllers
{
    public class PairController : Controller
    {
        #region private

        private ApplicationContext db;

        private User? GetUser(string? userName)
        {
            if (string.IsNullOrEmpty(userName))
            {
                if (!(User?.Identity?.IsAuthenticated ?? false)) return null;

                userName = User.FindFirstValue(ClaimsIdentity.DefaultNameClaimType);
            }
            var users = db.Users.Where(p => p.UserName == userName).Include(u => u.Pare);
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
        #endregion

        public PairController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet]
        [Route("api/pairs")]
        public async Task<PairsInfo> GetUserPaitProfile()
        {
            var user = GetUser(string.Empty);

            if (user == null) return PairsInfo.Fail("No such a user");

            return PairsInfo.Success(user.Pare, db);
        }

        [HttpGet]
        [Route("api/pairs/random")]
        public async Task<PairsInfo> Random()
        {
            var user = GetUser(string.Empty);

            var users = db.Users.ToList();

            if (user == null) return PairsInfo.Fail("No such a user");

            foreach (var u in users)
            {
                db.Pairs.Add(new Pair
                { UserId = user.Id, PaireId = u.Id, TitlePare = "крутая пара" });
            }

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                return PairsInfo.Fail(e.Message);
            }

            return PairsInfo.Success(user.Pare, db);
        }
    }
}
