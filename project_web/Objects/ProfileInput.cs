using project_web.Models;

namespace project_web.Objects
{
    public class ProfileInput
    {
        public string Interests { get; init; } = string.Empty;

        public string Knowledge { get; init; } = string.Empty;

        public bool Mentor { get; init; } = false;

        public bool Student { get; init; } = false;

        public bool SearchStudent { get; init; } = false;

        public string Hobby { get; init; } = string.Empty;

        public static void CopyToModel(ProfileInput input, UserProfile model)
        {
            model.Knowledge = input.Knowledge;
            model.Interests = input.Interests;
            model.Mentor = input.Mentor;
            model.Student = input.Student;
            model.SearchStudent = input.SearchStudent;
            model.Hobby = input.Hobby;
        }
    }
}
