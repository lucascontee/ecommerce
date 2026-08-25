using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ECommerce.Application.Interfaces;

namespace ECommerce.Application.Services;

public class CategoryService : ICategoryService
{
    public async Task<IEnumerable<object>> GetAllAsync() => await Task.FromResult(new List<object>());
    public async Task<object?> GetByIdAsync(Guid id) => await Task.FromResult<object?>(null);
    public async Task<object> CreateAsync(object dto) => await Task.FromResult(new object());
    public async Task UpdateAsync(Guid id, object dto) => await Task.CompletedTask;
    public async Task DeleteAsync(Guid id) => await Task.CompletedTask;
}
