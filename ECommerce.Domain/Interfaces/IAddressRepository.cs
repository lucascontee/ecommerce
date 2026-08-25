using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ECommerce.Domain.Entities;

namespace ECommerce.Domain.Interfaces;

public interface IAddressRepository
{
    Task<Address?> GetByIdAsync(Guid id);
    Task<IEnumerable<Address>> GetAllAsync();
    Task<Address> AddAsync(Address entity);
    Task UpdateAsync(Address entity);
    Task DeleteAsync(Guid id);
}
