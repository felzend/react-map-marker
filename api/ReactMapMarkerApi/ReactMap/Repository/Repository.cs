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
            try
            {
                var sessionFactory = DbHandler.CreateSessionFactory();
                using (var session = sessionFactory.OpenSession())
                {
                    return session.CreateCriteria(typeof(T)).List<T>();
                }
            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public void Add(T entity)
        {
            try
            {
                var sessionFactory = DbHandler.CreateSessionFactory();
                using (var session = sessionFactory.OpenSession())
                {
                    using (var transaction = session.BeginTransaction())
                    {
                        session.SaveOrUpdate(entity);
                        transaction.Commit();
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public void Delete(long id)
        {
            try
            {
                var sessionFactory = DbHandler.CreateSessionFactory();
                using (var session = sessionFactory.OpenSession())
                {
                    using (var transaction = session.BeginTransaction())
                    {
                        T entity = session.Get<T>(id);
                        session.Delete(entity);
                        transaction.Commit();
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
