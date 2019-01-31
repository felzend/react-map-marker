using NHibernate;
using FluentNHibernate.Cfg;
using Microsoft.Extensions.Configuration;
using System.IO;
using NHibernate.Tool.hbm2ddl;
using ReactMap.Model;

namespace ReactMap.Database
{
    public class DbHandler
    {
        public static ISessionFactory CreateSessionFactory()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("DBConfig.json");
            var settings = builder.Build();
            var configuration = Fluently
                .Configure()
                .Database(FluentNHibernate.Cfg.Db.MsSqlConfiguration.MsSql2012.ConnectionString(settings["ConnectionString"]))
                .Mappings(x => x.FluentMappings.AddFromAssemblyOf<Place>())
                .BuildConfiguration();

            new SchemaUpdate(configuration).Execute(false, true);
            return configuration.BuildSessionFactory();
        }
    }
}
