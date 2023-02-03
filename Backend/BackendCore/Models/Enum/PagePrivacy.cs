using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Models.Enum
{
    public enum PagePrivacy
    {
        [BsonRepresentation(BsonType.String)]
        PUBLIC,
        [BsonRepresentation(BsonType.String)]
        PRIVATE
    }
}
