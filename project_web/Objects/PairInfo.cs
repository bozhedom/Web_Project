using project_web.Models;
using project_web.DataBase;

namespace project_web.Objects;

public class PairInfo
{
    public string UserId { get; set; } = string.Empty;

    public string PaireId { get; set; } = string.Empty;

    public string TitlePare { get; set; } = string.Empty;

    public static PairInfo FromModelTPairInfo(Pair pair, ApplicationContext db)
    {
        var userId = db.Users.Where((user => user.Id.Equals(pair.UserId))).First().UserName;
        var paireId = db.Users.Where((user => user.Id.Equals(pair.PaireId))).First().UserName;
        return new PairInfo
        {
            UserId = userId,
            PaireId = paireId,
            TitlePare = pair.TitlePare
        };
    }
}