using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using ECommerce.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ECommerce.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _userRepository.GetAllAsync();
    }
    public async Task<User?> GetByIdAsync(Guid id)
    {
        return await _userRepository.GetByIdAsync(id);
    }
    public async Task<User> CreateAsync(User dto)
    {
        PasswordHasher<User> passwordHasher = new PasswordHasher<User>();
        var hashedPassword = passwordHasher.HashPassword(dto, dto.PasswordHash);

        var user = new User
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = hashedPassword,
            IsActive = true
        };

        await _userRepository.AddAsync(user);
        return user;
    }

    public async Task UpdateAsync(Guid id, User dto) => await Task.CompletedTask;
    public async Task DeleteAsync(Guid id) => await Task.CompletedTask;

    public async Task Login(User user)
    {
        User? dbUser = await _userRepository.GetByEmailAsync(user.Email);

        if(dbUser == null)
        {
            throw new Exception("As informações de login que você inseriu estão incorretas");
        }

        PasswordHasher<User> passwordHasher = new PasswordHasher<User>();
        var result = passwordHasher.VerifyHashedPassword(dbUser, dbUser.PasswordHash, user.PasswordHash);

        if (result == PasswordVerificationResult.Failed)
        {
            throw new Exception("As informações de login que você inseriu estão incorretas");
        }

        if (result == PasswordVerificationResult.Success)
        {
            return;
        }
    }
}
