using BackendCore.Database.Models;
using BackendCore.Models.Enum;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendCore.Models
{
    public class ReviewUserModel
    {
        public Review Review { get; set; }
        public User User { get; set; }

        public ReviewUserModel(Review review, User user)
        {
            Review = review;
            User = user;
        }
    }
}