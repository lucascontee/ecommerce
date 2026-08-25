using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ECommerce.Domain.Entities;

namespace ECommerce.Domain.Interfaces;

public interface ICartRepository
{
    Task<Cart?> GetByIdAsync(Guid id);
    Task<IEnumerable<Cart>> GetAllAsync();
    Task<Cart> AddAsync(Cart entity);
    Task UpdateAsync(Cart entity);
    Task DeleteAsync(Guid id);
}
