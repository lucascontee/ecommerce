using System;
using System.Threading.Tasks;
using ECommerce.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    // Simplified due to missing some specific services like IAddressService, but we inject what exists
    public CategoriesController()
    {
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(new string[] { "value1", "value2" });
    }

    [HttpGet("{id}")]
    public IActionResult Get(Guid id)
    {
        return Ok("value");
    }

    [HttpPost]
    public IActionResult Post([FromBody] object value)
    {
        return Created("", value);
    }

    [HttpPut("{id}")]
    public IActionResult Put(Guid id, [FromBody] object value)
    {
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        return NoContent();
    }
}
