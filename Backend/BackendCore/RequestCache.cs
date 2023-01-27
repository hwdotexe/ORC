using System;
using System.Collections.Generic;
using System.Runtime.Caching;
using System.Text;

namespace BackendAPI.Core
{
    public class RequestCache
    {
        public ObjectCache Cache { get; }
        public int CacheDurationMinutes { get; }

        public RequestCache(int minutes = 60)
        {
            Cache = MemoryCache.Default;
            CacheDurationMinutes = minutes;
        }

        public CacheItemPolicy GetCachePolicy()
        {
            var policy = new CacheItemPolicy
            {
                AbsoluteExpiration = DateTime.Now.AddHours(CacheDurationMinutes)
            };

            return policy;
        }
    }
}