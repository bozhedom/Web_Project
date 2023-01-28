using project_web.DataBase;
using project_web.Models;

namespace project_web.Objects
{
    public class PairsInfo
    {
        public List<PairInfo> List { get; set; } = new();

        public string ErrorMessage { get; private set; } = string.Empty;

        public static PairsInfo Success(List<Pair> list, ApplicationContext db)
        {
            List<PairInfo> newList = new();
            foreach (var i in list)
            {
                newList.Add(PairInfo.FromModelTPairInfo(i, db));
            }

            return new PairsInfo
            {
                List = newList
            };
        }

        public static PairsInfo Fail(string errorMessage)
        {
            return new PairsInfo
            {
                ErrorMessage = errorMessage
            };
        }
    }
}
