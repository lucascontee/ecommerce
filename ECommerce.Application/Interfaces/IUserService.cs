using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ECommerce.Application.Interfaces;

public interface IUserService
{
    Task<IEnumerable<User>> GetAllAsync();
    Task<User?> GetByIdAsync(Guid id);
    Task<User> CreateAsync(User dto);
    Task UpdateAsync(Guid id, User dto);
    Task DeleteAsync(Guid id);
    Task Login(User user);
}
