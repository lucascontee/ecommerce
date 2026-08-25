using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ECommerce.Application.Interfaces;

public interface IProductService
{
    // Basic contract
    Task<IEnumerable<object>> GetAllAsync();
    Task<object?> GetByIdAsync(Guid id);
    Task<object> CreateAsync(object dto);
    Task UpdateAsync(Guid id, object dto);
    Task DeleteAsync(Guid id);
}
