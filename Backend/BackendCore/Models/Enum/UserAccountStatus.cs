using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Models.Enum
{
    public enum UserAccountStatus
    {
        [BsonRepresentation(BsonType.String)]
        ENABLED,
        [BsonRepresentation(BsonType.String)]
        DISABLED
    }
}

