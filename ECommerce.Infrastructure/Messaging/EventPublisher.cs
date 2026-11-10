using RabbitMQ.Client;
using System.Text.Json;
using ECommerce.Application.Interfaces;

namespace ECommerce.Infrastructure.Messaging;

public class EventPublisher : IEventPublisher
{
    private const string exchangeName = "ecommerce.exchange";
    private const string routingName = "ecommerce.created";
    private const string queueName = "ecommerce.createdQueue";    

    private IConnection _connection;

    public async Task InitializeAsync()
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

        _connection = await factory.CreateConnectionAsync();

        await using var channel = await _connection.CreateChannelAsync();

        await channel.ExchangeDeclareAsync(exchangeName, ExchangeType.Direct, durable: true);
        await channel.QueueDeclareAsync(queueName, durable: true, exclusive: false, autoDelete: false);
        await channel.QueueBindAsync(queueName, exchangeName, routingName);
    }

    public async Task PublishOrderMessage(object orderEvent)
    {
        if (_connection == null) throw new Exception("Conexão com RabbitMQ não inicializada.");

        await using var channel = await _connection.CreateChannelAsync();

        var body = JsonSerializer.SerializeToUtf8Bytes(orderEvent);
        var properties = new BasicProperties { Persistent = true };

        await channel.BasicPublishAsync(exchange: exchangeName, 
            routingKey: routingName, 
            mandatory: false,
            basicProperties: properties, 
            body: body
        );
    }
}