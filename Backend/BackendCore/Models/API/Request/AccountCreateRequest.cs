namespace BackendCore.Models.API.Request
{
    public struct AccountCreateRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string DisplayName { get; set; }
    }
}
