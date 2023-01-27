using BackendCore.Models.Enum;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BackendCore.Automation
{
    /// <summary>
    /// A simple routine that calls a pruning function in the AuthTokenManager class.
    /// </summary>
    public class PruneExpiredSessions
    {
        private Timer taskTimer;

        public PruneExpiredSessions()
        {
            taskTimer = new Timer(x =>
            {
                Run();
            }, null, 0, 0);
        }

        public void Run()
        {
            App.GetState().Auth.InvalidateExpiredSessions();

            // Reschedule timer for 3 hours from now.
            var now = DateTime.Now;
            var timeUntil = (long)(DateTime.Now.AddHours(3) - now).TotalMilliseconds;

            taskTimer.Change(timeUntil, Timeout.Infinite);
        }
    }
}
