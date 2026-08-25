using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ECommerce.Domain.Entities;
using ECommerce.Domain.Interfaces;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Infrastructure.Repositories;

public class CartRepository : ICartRepository
{
    private readonly ECommerceDbContext _context;

    public CartRepository(ECommerceDbContext context)
    {
        _context = context;
    }

    public async Task<Cart?> GetByIdAsync(Guid id)
    {
        return await _context.Set<Cart>().FindAsync(id);
    }

    public async Task<IEnumerable<Cart>> GetAllAsync()
    {
        return await _context.Set<Cart>().ToListAsync();
    }

    public async Task<Cart> AddAsync(Cart entity)
    {
        await _context.Set<Cart>().AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(Cart entity)
    {
        _context.Set<Cart>().Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null)
        {
            _context.Set<Cart>().Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
