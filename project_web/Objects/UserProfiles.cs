using project_web.Models;

namespace project_web.Objects
{
    public class UserProfiles
    {
        public string Interests { get; init; }

        public string Knowledge { get; init; }

        public bool Mentor { get; init; }

        public bool Student { get; init; }

        public bool SearchStudent { get; init; }

        public string Hobby { get; init; }

        public static UserProfiles CopyUserProfile(UserProfile userProfile)
        {
            return new UserProfiles
            {
                Knowledge = userProfile.Knowledge,
                Interests = userProfile.Interests,
                Mentor = userProfile.Mentor,
                Student = userProfile.Student,
                SearchStudent = userProfile.SearchStudent,
                Hobby = userProfile.Hobby
            };
        }
    }
}
