using project_web.Models;

namespace project_web.Objects
{
    public class UserInfo
    {
        public Guid Id { get; private set; } = Guid.Empty;

        public string UserName { get; private set; } = string.Empty;

        public string Role { get; private set; } = string.Empty;

        public UserProfiles UserProfile { get; private set; } = null;

        public string ErrorMessage { get; private set; } = string.Empty;

        public static UserInfo Success(User user) 
        {
            return new UserInfo
            {
                Id = user.Id,
                UserName = user.UserName,
                Role = user.Role,
                UserProfile = UserProfiles.CopyUserProfile(user.UserProfile)
            };
        }

        public static UserInfo Fail(string errorMessage)
        {
            return new UserInfo
            {
                ErrorMessage = errorMessage
            };
        }
    }
}
