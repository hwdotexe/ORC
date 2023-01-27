using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Models.Enum
{
    public enum UserAccountType
    {
        [BsonRepresentation(BsonType.String)]
        GUEST,
        [BsonRepresentation(BsonType.String)]
        REVIEWER,
        [BsonRepresentation(BsonType.String)]
        MODERATOR,
        [BsonRepresentation(BsonType.String)]
        ADMIN
    }
}

