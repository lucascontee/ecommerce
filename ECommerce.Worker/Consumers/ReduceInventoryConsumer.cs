using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using ECommerce.Domain.Interfaces;
using ECommerce.Domain.Enums;

namespace ECommerce.Worker.Consumers;

public class OrderCreatedEventDto
{
    public Guid OrderId { get; set; }
    public List<OrderItemDto> Items { get; set; } = new();
}

public class OrderItemDto
{
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
}

public class ReduceInventoryConsumer : BackgroundService
{
    private const string exchangeName = "ecommerce.exchange";
    private const string routingName = "ecommerce.created";
    private const string queueName = "ecommerce.createdQueue";

    private readonly ILogger<ReduceInventoryConsumer> _logger;
    private readonly IServiceProvider _serviceProvider;
    private IConnection? _connection;
    private IChannel? _channel;

    public ReduceInventoryConsumer(ILogger<ReduceInventoryConsumer> logger, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }

    public override async Task StartAsync(CancellationToken cancellationToken)
    {
        var factory = new ConnectionFactory()
        {
            HostName = "rabbitmq",
            Port = 5672,
            UserName = "guest",
            Password = "guest",
            VirtualHost = "/",
            AutomaticRecoveryEnabled = true,
            NetworkRecoveryInterval = TimeSpan.FromSeconds(10)
        };

        _connection = await factory.CreateConnectionAsync(cancellationToken);
        _channel = await _connection.CreateChannelAsync(cancellationToken: cancellationToken);

        await _channel.ExchangeDeclareAsync(exchangeName, ExchangeType.Direct, durable: true, autoDelete: false, cancellationToken: cancellationToken);
        await _channel.QueueDeclareAsync(queueName, durable: true, exclusive: false, autoDelete: false, cancellationToken: cancellationToken);
        await _channel.QueueBindAsync(queueName, exchangeName, routingName, cancellationToken: cancellationToken);

        await _channel.BasicQosAsync(
            prefetchSize: 0,
            prefetchCount: 1,
            global: false,
            cancellationToken: cancellationToken
        );

        await base.StartAsync(cancellationToken);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        if (_channel == null) return;

        var consumer = new AsyncEventingBasicConsumer(_channel);

        consumer.ReceivedAsync += async (model, ea) =>
        {
            try
            {
                var body = ea.Body.ToArray();
                var json = Encoding.UTF8.GetString(body);
                
                var orderEvent = JsonSerializer.Deserialize<OrderCreatedEventDto>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                
                if (orderEvent != null)
                {
                    _logger.LogInformation($"Processando pedido {orderEvent.OrderId}");
                    await ProcessInventoryReduction(orderEvent);
                }

                await _channel.BasicAckAsync(deliveryTag: ea.DeliveryTag, multiple: false, cancellationToken: stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao processar mensagem do RabbitMQ");
                await _channel.BasicNackAsync(deliveryTag: ea.DeliveryTag, multiple: false, requeue: false, cancellationToken: stoppingToken);
            }
        };

        await _channel.BasicConsumeAsync(queue: queueName, autoAck: false, consumer: consumer, cancellationToken: stoppingToken);
    }

    private async Task ProcessInventoryReduction(OrderCreatedEventDto orderEvent)
    {
        using var scope = _serviceProvider.CreateScope();
        
        var productRepository = scope.ServiceProvider.GetRequiredService<IProductRepository>();
        var orderRepository = scope.ServiceProvider.GetRequiredService<IOrderRepository>();

        foreach (var item in orderEvent.Items)
        {
            await productRepository.ReduceInventoryAsync(item.ProductId, item.Quantity);
        }

        var order = await orderRepository.GetByIdAsync(orderEvent.OrderId);
        if (order != null)
        {
            order.Status = OrderStatus.Processing;
            await orderRepository.UpdateAsync(order);
        }
    }

    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        if (_channel != null) await _channel.CloseAsync(cancellationToken: cancellationToken);
        if (_connection != null) await _connection.CloseAsync(cancellationToken: cancellationToken);
        await base.StopAsync(cancellationToken);
    }
}
