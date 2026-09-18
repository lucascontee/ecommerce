using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Application;

public static class JwtConfiguration
{
    public static string PrivateKey { get; set; } = Environment.GetEnvironmentVariable("PRIVATE_KEY") ?? throw new InvalidOperationException("Environment variable 'PRIVATE_KEY' is not set");
}
