using BackendCore.Authentication;
using BackendCore.Database;
using BackendCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendCore
{
    public class State
    {
        public List<User> LoadedUsers { get; }
        public List<Review> Reviews { get; private set; }
        public List<Request> Requests { get; private set; }
        public List<Report> Reports { get; set; }
        public Gatekeeper Auth { get; }
        public DBHandler DB { get; set; }

        public State()
        {
            Console.WriteLine("Loading State...");

            LoadedUsers = new List<User>();
            Reviews = new List<Review>();
            Auth = new Gatekeeper();
            DB = new DBHandler(App.databaseName);

            LoadReviewsFromDB();
            LoadRequestsFromDB();
            LoadReportsFromDB();

            Console.WriteLine("State Loaded!");
        }

        private void LoadReviewsFromDB()
        {
            Console.WriteLine("Loading Reviews from Database...");

            Reviews = DB.GetReviews();
            
            Reviews.Reverse();

            Console.WriteLine("Reviews Loaded!");
        }

        private void LoadRequestsFromDB()
        {
            Console.WriteLine("Loading Requests from Database...");

            Requests = DB.GetRequests();

            Console.WriteLine("Requests Loaded!");
        }

        private void LoadReportsFromDB()
        {
            Console.WriteLine("Loading Reports from Database...");

            Reports = DB.GetReports();

            Console.WriteLine("Reports Loaded!");
        }
    }
}
