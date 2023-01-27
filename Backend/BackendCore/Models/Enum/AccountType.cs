using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Models.Enum
{
    public enum AccountType
    {
        [BsonRepresentation(BsonType.String)]
        USER,
        [BsonRepresentation(BsonType.String)]
        ADMIN
    }
}

