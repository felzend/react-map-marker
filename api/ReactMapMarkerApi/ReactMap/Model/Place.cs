using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactMap.Model
{
    public class Place
    {
        public virtual int Id { get; set; }
        public virtual float Lat { get; set; }
        public virtual float Lng { get; set; }
        public virtual string Description { get; set; }
        public virtual DateTime CreatedAt { get; set; }
        public virtual DateTime UpdatedAt { get; set; }
    }
}
