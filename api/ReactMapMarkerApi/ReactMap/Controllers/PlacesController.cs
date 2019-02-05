using System;
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
        public PlacesRepository Repository { get; set; }

        public PlacesController()
        {
            IKernel kernel = new StandardKernel(new CoreModule());
            this.Repository = kernel.Get<PlacesRepository>();
        }

        [HttpGet]
        public IActionResult Index()
        {
            try
            {
                return Ok(this.Repository.All());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]Place place)
        {
            try
            {
                return Json(this.Repository.Add(place));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                this.Repository.Delete(id);
                return Ok("Local deletado coms sucesso.");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
