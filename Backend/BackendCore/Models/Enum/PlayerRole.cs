using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendCore.Models.Enum
{
    public enum PlayerRole
    {
        [BsonRepresentation(BsonType.String)]
        Player,
        [BsonRepresentation(BsonType.String)]
        TrustedPlayer,
        [BsonRepresentation(BsonType.String)]
        GameMaster,
        [BsonRepresentation(BsonType.String)]
        Owner
    }
}
