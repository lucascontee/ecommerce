using System;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using ECommerce.Infrastructure;
using ECommerce.Worker.Consumers;

var builder = Host.CreateDefaultBuilder(args)
    .ConfigureServices((hostContext, services) =>
    {
        services.AddInfrastructure(hostContext.Configuration);

        services.AddHostedService<ReduceInventoryConsumer>();
    });

var host = builder.Build();

await host.RunAsync();