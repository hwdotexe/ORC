namespace BackendCore.Models.GameSystem
{
    public class CharacterField
    {
        public string Name { get; set; }
        public CharacterFieldType Type { get; set; }
        public string? Provider { get; set; }
    }
}
