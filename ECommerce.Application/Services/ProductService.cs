using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using ECommerce.Domain.Interfaces;

namespace ECommerce.Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<IEnumerable<object>> GetAllAsync()
    {
        var products = await _productRepository.GetAllAsync();
        return products.Select(p => new ProductDto 
        { 
            Id = p.Id, Name = p.Name, Description = p.Description, Price = p.Price, StockQuantity = p.StockQuantity, CategoryId = p.CategoryId 
        });
    }

    public async Task<object?> GetByIdAsync(Guid id)
    {
        var p = await _productRepository.GetByIdAsync(id);
        if (p == null) return null;
        return new ProductDto 
        { 
            Id = p.Id, Name = p.Name, Description = p.Description, Price = p.Price, StockQuantity = p.StockQuantity, CategoryId = p.CategoryId 
        };
    }

    public async Task<object> CreateAsync(object dto)
    {
        var createDto = (CreateProductDto)dto;
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = createDto.Name,
            Description = createDto.Description,
            Price = createDto.Price,
            StockQuantity = createDto.StockQuantity,
            CategoryId = createDto.CategoryId,
            CreatedAt = DateTime.UtcNow
        };
        
        await _productRepository.AddAsync(product);
        return new ProductDto { Id = product.Id, Name = product.Name, Description = product.Description, Price = product.Price, StockQuantity = product.StockQuantity, CategoryId = product.CategoryId };
    }

    public async Task UpdateAsync(Guid id, object dto)
    {
        var updateDto = (CreateProductDto)dto;
        var product = await _productRepository.GetByIdAsync(id);
        if (product != null)
        {
            product.Name = updateDto.Name;
            product.Description = updateDto.Description;
            product.Price = updateDto.Price;
            product.StockQuantity = updateDto.StockQuantity;
            product.CategoryId = updateDto.CategoryId;
            product.UpdatedAt = DateTime.UtcNow;
            
            await _productRepository.UpdateAsync(product);
        }
    }

    public async Task DeleteAsync(Guid id)
    {
        await _productRepository.DeleteAsync(id);
    }
}
