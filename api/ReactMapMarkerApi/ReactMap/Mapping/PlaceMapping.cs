using FluentNHibernate.Mapping;
using ReactMap.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactMap.Mapping
{
    public class PlaceMapping : ClassMap<Place>
    {
        public PlaceMapping()
        {
            Id(x => x.Id);
            Map(x => x.Lat)
                .Not.Nullable();
            Map(x => x.Lng)
                .Not.Nullable();
            Map(x => x.Description)
                .Length(40)
                .Not.Nullable();
            Map(x => x.CreatedAt)
                .Default("getdate()");
            Map(x => x.UpdatedAt)
                .Default("getdate()");
        }
    }
}
