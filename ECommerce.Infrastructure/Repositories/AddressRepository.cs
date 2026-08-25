using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ECommerce.Domain.Entities;
using ECommerce.Domain.Interfaces;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Infrastructure.Repositories;

public class AddressRepository : IAddressRepository
{
    private readonly ECommerceDbContext _context;

    public AddressRepository(ECommerceDbContext context)
    {
        _context = context;
    }

    public async Task<Address?> GetByIdAsync(Guid id)
    {
        return await _context.Set<Address>().FindAsync(id);
    }

    public async Task<IEnumerable<Address>> GetAllAsync()
    {
        return await _context.Set<Address>().ToListAsync();
    }

    public async Task<Address> AddAsync(Address entity)
    {
        await _context.Set<Address>().AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(Address entity)
    {
        _context.Set<Address>().Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null)
        {
            _context.Set<Address>().Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
