using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ninject.Modules;
using ReactMap.Repository;

namespace ReactMap.Modules
{
    public class CoreModule : NinjectModule
    {
        public override void Load()
        {
            this.Bind<PlacesRepository>().ToSelf();
        }
    }
}
