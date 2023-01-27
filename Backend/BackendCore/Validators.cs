using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace BackendCore
{
    public static class Validators
    {
        private static readonly Regex emailValidator = new Regex(@"^[a-z0-9_+\-.]+@[a-z0-9_\-.]+\.[a-z]{2,12}$", RegexOptions.Compiled | RegexOptions.IgnoreCase);
        private static readonly Regex passwordValidator = new Regex(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$", RegexOptions.Compiled);

        public static bool ValidateEmail(string test)
        {
            return emailValidator.IsMatch(test);
        }

        public static bool ValidatePassword(string test)
        {
            return passwordValidator.IsMatch(test);
        }
    }
}
