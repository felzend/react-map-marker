using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Ninject;
using ReactMap.Model;
using ReactMap.Repository;

namespace ReactMap.Controllers
{
    [Produces("application/json")]
    [Route("api/Places")]
    [EnableCors("AllowLocalhost")]
    public class PlacesController : Controller
    {
        [Inject]
        public PlacesRepository Repository { get; set; }

        public PlacesController()
        {
            IKernel kernel = new StandardKernel();
            kernel.Bind<PlacesRepository>().ToSelf();
            this.Repository = kernel.Get<PlacesRepository>();
        }

        [HttpGet]
        public IList<Place> Index()
        {
            return this.Repository.All();
        }

        [HttpPost]
        [Route("Add")]
        public void Add([FromBody]Place obj)
        {
            this.Repository.Add(obj);
        }
    }
}
