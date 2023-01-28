using project_web.Enums;

namespace project_web.Objects
{
    /// <summary>
    /// Информация о пользователе
    /// </summary>
    public class AuthInfo
    {
        /// <summary>
        /// Аутенцифицирован ли пользователь
        /// </summary>
        public bool IsAuthenticated { get; private set; }

        public string UserName { get; protected set; } = string.Empty;
        /// <summary>
        /// Роль пользователя
        /// </summary>
        public RoleType Role { get; private set; }

        public string ErrorMessage { get; private set; } = string.Empty;
        /// <summary>
        /// Успешная аутентификация
        /// </summary>
        public static AuthInfo Success(string userName, RoleType role)
        {
            return new AuthInfo()
            {
                UserName = userName,
                IsAuthenticated = true,
                Role = role
            };
        }

        /// <summary>
        /// Ошибка аутентификации
        /// </summary>
        /// <returns></returns>
        public static AuthInfo Fail(string errorMessage)
        {
            return new AuthInfo()
            {
                IsAuthenticated = false,
                Role = RoleType.Undefined,
                ErrorMessage = errorMessage
            };
        }
    }
}