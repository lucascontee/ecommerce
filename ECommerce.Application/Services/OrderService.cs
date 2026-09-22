using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ECommerce.Application.Interfaces;
using ECommerce.Application.DTOs;
using ECommerce.Domain.Entities;
using ECommerce.Domain.Interfaces;
using ECommerce.Domain.Enums;

namespace ECommerce.Application.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IProductRepository _productRepository;
    private readonly IAddressRepository _addressRepository;

    public OrderService(IOrderRepository orderRepository, IProductRepository productRepository, IAddressRepository addressRepository)
    {
        _orderRepository = orderRepository;
        _productRepository = productRepository;
        _addressRepository = addressRepository;
    }

    public async Task<IEnumerable<object>> GetAllAsync() => await Task.FromResult(new List<object>());
    public async Task<object?> GetByIdAsync(Guid id) => await Task.FromResult<object?>(null);
    public async Task<object> CreateAsync(object dto) => await Task.FromResult(new object());
    public async Task UpdateAsync(Guid id, object dto) => await Task.CompletedTask;
    public async Task DeleteAsync(Guid id) => await Task.CompletedTask;

    public async Task<object> CreateOrderAsync(Guid userId, CreateOrderDto dto)
    {
        if (dto.Items == null || !dto.Items.Any())
            throw new Exception("O carrinho está vazio.");

        // Criar ou obter um endereço padrão (dummy) para simplificar
        var addresses = await _addressRepository.GetAllAsync();
        var address = addresses.FirstOrDefault(a => a.UserId == userId);
        if (address == null)
        {
            address = new Address 
            { 
                Id = Guid.NewGuid(), 
                UserId = userId, 
                Street = "Rua Padrão", 
                City = "Cidade", 
                State = "Estado", 
                ZipCode = "00000-000", 
                Country = "Brasil" 
            };
            await _addressRepository.AddAsync(address);
        }

        var order = new Order
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            OrderDate = DateTime.UtcNow,
            Status = OrderStatus.Pending,
            ShippingAddressId = address.Id,
            Items = new List<OrderItem>()
        };

        decimal totalAmount = 0;

        foreach (var itemDto in dto.Items)
        {
            var product = await _productRepository.GetByIdAsync(itemDto.ProductId);
            if (product == null)
                throw new Exception($"Produto {itemDto.ProductId} não encontrado.");

            if (product.StockQuantity < itemDto.Quantity)
                throw new Exception($"Estoque insuficiente para o produto {product.Name}. Disponível: {product.StockQuantity}");

            // Deduzir estoque
            product.StockQuantity -= itemDto.Quantity;
            await _productRepository.UpdateAsync(product);

            var orderItem = new OrderItem
            {
                Id = Guid.NewGuid(),
                OrderId = order.Id,
                ProductId = product.Id,
                Quantity = itemDto.Quantity,
                UnitPrice = product.Price,
                TotalPrice = product.Price * itemDto.Quantity
            };

            order.Items.Add(orderItem);
            totalAmount += orderItem.TotalPrice;
        }

        order.TotalAmount = totalAmount;

        // Simulando que o pagamento foi processado e aprovado com sucesso
        order.Status = OrderStatus.Processing;

        await _orderRepository.AddAsync(order);

        return new { 
            order.Id, 
            order.TotalAmount, 
            order.Status,
            message = "Pedido criado e pago com sucesso!"
        };
    }
}
