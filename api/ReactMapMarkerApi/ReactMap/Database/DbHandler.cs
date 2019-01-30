using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using NHibernate;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;

namespace ReactMap.Database
{
    public class DbHandler
    {
        public static ISessionFactory CreateSessionFactory()
        {
            return Fluently
                .Configure().Database(MsSqlConfiguration.MsSql2005.ConnectionString(c =>
                //.Mappings(null)
                .BuildSessionFactory();
        }
    }
}
