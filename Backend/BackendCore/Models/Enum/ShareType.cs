using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Models.Enum
{
    public enum ShareType
    {
        [BsonRepresentation(BsonType.String)]
        VIEW,
        [BsonRepresentation(BsonType.String)]
        EDIT,
        [BsonRepresentation(BsonType.String)]
        FULL
    }
}

