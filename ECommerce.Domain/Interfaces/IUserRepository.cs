using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ECommerce.Domain.Entities;

namespace ECommerce.Domain.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(Guid id);
    Task<IEnumerable<User>> GetAllAsync();
    Task<User> AddAsync(User entity);
    Task UpdateAsync(User entity);
    Task DeleteAsync(Guid id);
    Task<User?> GetByEmailAsync(string email);
}
