using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Ninject;
using ReactMap.Model;
using ReactMap.Modules;
using ReactMap.Repository;

namespace ReactMap.Controllers
{
    [Produces("application/json")]
    [Route("api/places")]
    public class PlacesController : Controller
    {
        [Inject]
        public PlacesRepository Repository { get; set; }

        public PlacesController()
        {
            IKernel kernel = new StandardKernel(new CoreModule());
            this.Repository = kernel.Get<PlacesRepository>();
        }

        [HttpGet]
        public IList<Place> Index()
        {
            return this.Repository.All();
        }

        [HttpPost("add")]
        public void Add([FromBody]Place obj)
        {
            this.Repository.Add(obj);
        }
    }
}
