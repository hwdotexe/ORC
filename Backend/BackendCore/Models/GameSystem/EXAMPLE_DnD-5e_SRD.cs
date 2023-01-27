using System.Collections.Generic;

namespace BackendCore.Models.GameSystem
{
    public class EXAMPLE_DnD_5e_SRD : GameSystem
    {
        public EXAMPLE_DnD_5e_SRD()
        {
            Name = "D&D Example";
            Version = "5th Edition";
            Publisher = "Wizards of the Coast";
            CharacterFieldValueProviders = new List<CharacterFieldValueProvider>
            {
                new CharacterFieldValueProvider
                {
                    ProviderID = "class_provider",
                    Values = new List<string>
                    {
                        "Barbarian",
                        "Bard",
                        "Cleric",
                        "Druid",
                        "Fighter",
                        "Monk",
                        "Paladin",
                        "Ranger",
                        "Rogue",
                        "Sorcerer",
                        "Warlock",
                        "Wizard"
                    }
                }
            };

            CharacterFields = new List<CharacterField>
            {
                new CharacterField
                {
                    Name = "Name",
                    Type = CharacterFieldType.STRING
                },
                new CharacterField
                {
                    Name = "Age",
                    Type = CharacterFieldType.INTEGER
                },
                new CharacterField
                {
                    Name = "Class",
                    Type = CharacterFieldType.STRING,
                    Provider = "class_provider"
                },
                new CharacterField
                {
                    Name = "Inventory",
                    Type = CharacterFieldType.STRING_LIST
                },
            };
        }
    }
}