using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace ECommerce.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{userId}/orders")]
    public async Task<IActionResult> GetUserOrders(Guid userId)
    {
        return Ok();
    }

    [HttpPost("/register")]
    public async Task<IActionResult> Register([FromBody] User request)
    {
        var createdUser = await _userService.CreateAsync(request);
        return CreatedAtAction(nameof(Register), new { id = ((User)createdUser).Id }, createdUser);
    }

    [HttpPost("/login")]
    public async Task<IActionResult> Login([FromBody] User request)
    {

        return Ok();
    }
}
