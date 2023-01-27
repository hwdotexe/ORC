using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Models.Enum
{
    public enum AccountStatus
    {
        [BsonRepresentation(BsonType.String)]
        ENABLED,
        [BsonRepresentation(BsonType.String)]
        DISABLED
    }
}

