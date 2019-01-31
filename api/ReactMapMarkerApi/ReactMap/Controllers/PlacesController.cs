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
    [EnableCors("http://localhost/")] // Precisa ajeitar CORS
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

        [Route("")]
        [HttpGet]
        public IList<Place> Index()
        {
            return this.Repository.All();
        }
    }
}
