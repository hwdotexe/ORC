using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Models.GameSystem
{
    public enum CharacterFieldType
    {
        [BsonRepresentation(BsonType.String)]
        STRING,
        [BsonRepresentation(BsonType.String)]
        INTEGER,
        [BsonRepresentation(BsonType.String)]
        STRING_LIST
    }
}
