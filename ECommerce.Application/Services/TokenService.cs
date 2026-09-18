using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ECommerce.Application.Services;

public class TokenService : ITokenService
{
    public string GenerateToken(User user)
    {
        var handler = new JwtSecurityTokenHandler();

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = GenerateClaimsIdentity(user),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(JwtConfiguration.PrivateKey)), SecurityAlgorithms.HmacSha256Signature),
            Expires = DateTime.UtcNow.AddHours(2)
        };

        var token = handler.CreateToken(tokenDescriptor);
        return handler.WriteToken(token);
    }

    private static ClaimsIdentity GenerateClaimsIdentity(User user)
    {
        var ci = new ClaimsIdentity();

        ci.AddClaim(new Claim(ClaimTypes.Name, user.Name));
        ci.AddClaim(new Claim(ClaimTypes.Email, user.Email));

        return ci;
    }
}
