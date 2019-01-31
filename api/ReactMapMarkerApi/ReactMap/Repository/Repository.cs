using ReactMap.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactMap.Repository
{
    public abstract class Repository<T>
    {
        public IList<T> All()
        {
            var sessionFactory = DbHandler.CreateSessionFactory();
            using (var session = sessionFactory.OpenSession())
            {
                return session.CreateCriteria(typeof(T)).List<T>();
            }
        }
    }
}
