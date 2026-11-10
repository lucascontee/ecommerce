using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(User user)
    {
        var privateKey = _configuration["PRIVATE_KEY"]
            ?? throw new InvalidOperationException("A variável PRIVATE_KEY não foi configurada.");

        var handler = new JwtSecurityTokenHandler();

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = GenerateClaimsIdentity(user),

            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(privateKey)),
                SecurityAlgorithms.HmacSha256Signature),

            Expires = DateTime.UtcNow.AddHours(2)
        };

        var token = handler.CreateToken(tokenDescriptor);
        return handler.WriteToken(token);
    }

    private static ClaimsIdentity GenerateClaimsIdentity(User user)
    {
        var ci = new ClaimsIdentity();
        ci.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
        ci.AddClaim(new Claim(ClaimTypes.Name, user.Name));
        ci.AddClaim(new Claim(ClaimTypes.Email, user.Email));
        return ci;
    }
}