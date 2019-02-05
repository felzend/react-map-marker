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
    public class PlacesController : ControllerBase
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
        public IActionResult Index([FromBody]Place place)
        {
            try
            {                
                this.Repository.Add(place);
                return Ok("Local inserido com sucesso!");

            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        public IActionResult Delete(long id)
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
