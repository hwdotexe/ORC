using System;
using System.Collections.Generic;

namespace BackendCore.Models.GameSystem
{
    public class GameSystem
    {
        public Guid SystemID { get; set; }
        public string Name { get; set; }
        public string Version { get; set; }
        public string Publisher { get; set; }
        public List<CharacterFieldValueProvider> CharacterFieldValueProviders { get; set; }
        public List<CharacterField> CharacterFields { get; set; }

        // Mandated fields have a name and value. Values can have Providers stored here. Values can be String, Integer, or List<string>

        // D&D Module will build set of Mandated fields and provide their expected value.
        // This file should track/accept a model of what a set of mandated fields looks like.

        // Example: D&D character.
        // Name: String
        // Class: String (Provider = list of classes)
        // Subclass: String (Provider = list of classes)
        // Age: Integer
        // Inventory: LIST<string>

        //
        // Note: This exists to drive character creation in the app, but won't be where data is stored.
        // DB will use these models to populate fields for the UI and character object.

        public CharacterFieldValueProvider? GetProvider(CharacterField field)
        {
            if (field.Provider != null)
            {
                return CharacterFieldValueProviders.Find(provider => provider.ProviderID.Equals(field.Provider));
            }
            else
            {
                return null;
            }
        }
    }
}
