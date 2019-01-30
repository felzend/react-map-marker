using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ReactMap.Controllers
{
    [Produces("application/json")]
    [Route("api/Places")]
    public class PlacesController : Controller
    {
        [Route("All")]
        [HttpGet]
        public IEnumerable<string> Index()
        {
            return new string[] { "Places" };
        }
    }
}
