using ECommerce.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Infrastructure.Data;

public class ECommerceDbContext : DbContext
{
    public ECommerceDbContext(DbContextOptions<ECommerceDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Address> Addresses => Set<Address>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<ProductImage> ProductImages => Set<ProductImage>();
    public DbSet<Cart> Carts => Set<Cart>();
    public DbSet<CartItem> CartItems => Set<CartItem>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<Payment> Payments => Set<Payment>();
    public DbSet<Coupon> Coupons => Set<Coupon>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        var categoryId = Guid.Parse("11111111-1111-1111-1111-111111111111");

        var mouseId = Guid.Parse("22222222-2222-2222-2222-222222222222");
        var keyboardId = Guid.Parse("33333333-3333-3333-3333-333333333333");
        var monitorId = Guid.Parse("44444444-4444-4444-4444-444444444444");
        var gpuId = Guid.Parse("55555555-5555-5555-5555-555555555555");
        var cpuId = Guid.Parse("66666666-6666-6666-6666-666666666666");

        modelBuilder.Entity<Category>().HasData(
            new Category
            {
                Id = categoryId,
                Name = "Hardware & Periféricos",
                Description = "Equipamentos de informática e periféricos gerais",
                IsActive = true
            }
        );

        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = mouseId,
                Name = "Darmoshark M3 Wireless",
                Description = "Mouse gamer sem fio ultraleve com sensor PAW3395 e conexão Tri-Mode.",
                Price = 350.00m,
                StockQuantity = 25,
                SKU = "DM-M3-WHT",
                CategoryId = categoryId,
                IsActive = true
            },
            new Product
            {
                Id = keyboardId,
                Name = "Keychron K2 Wireless Mechanical",
                Description = "Teclado mecânico sem fio 75% layout, switches Gateron Brown e retroiluminação RGB.",
                Price = 650.00m,
                StockQuantity = 15,
                SKU = "KEY-K2-RGB",
                CategoryId = categoryId,
                IsActive = true
            },
            new Product
            {
                Id = monitorId,
                Name = "Monitor LG UltraGear 27'' IPS 144Hz",
                Description = "Monitor gamer 27 polegadas Full HD, painel IPS, 1ms de tempo de resposta e 144Hz.",
                Price = 1499.90m,
                StockQuantity = 10,
                SKU = "LG-27GL650F",
                CategoryId = categoryId,
                IsActive = true
            },
            new Product
            {
                Id = gpuId,
                Name = "NVIDIA GeForce RTX 4070 12GB",
                Description = "Placa de vídeo de alta performance com arquitetura Ada Lovelace e suporte a DLSS 3.",
                Price = 4200.00m,
                StockQuantity = 8,
                SKU = "NV-RTX4070-12G",
                CategoryId = categoryId,
                IsActive = true
            },
            new Product
            {
                Id = cpuId,
                Name = "AMD Ryzen 5 7600X",
                Description = "Processador desktop com 6 núcleos, 12 threads e clock turbo de até 5.3GHz, soquete AM5.",
                Price = 1650.00m,
                StockQuantity = 30,
                SKU = "AMD-R5-7600X",
                CategoryId = categoryId,
                IsActive = true
            }
        );

        modelBuilder.Entity<ProductImage>().HasData(
            new ProductImage
            {
                Id = Guid.Parse("77777777-1111-1111-1111-111111111111"),
                ProductId = mouseId,
                Url = "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop", // Imagem representativa de mouse
                IsPrimary = true
            },
            new ProductImage
            {
                Id = Guid.Parse("77777777-2222-1111-1111-111111111111"),
                ProductId = keyboardId,
                Url = "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop", // Imagem representativa de teclado
                IsPrimary = true
            },
            new ProductImage
            {
                Id = Guid.Parse("77777777-3333-1111-1111-111111111111"),
                ProductId = monitorId,
                Url = "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop", // Imagem representativa de monitor
                IsPrimary = true
            },
            new ProductImage
            {
                Id = Guid.Parse("77777777-4444-1111-1111-111111111111"),
                ProductId = gpuId,
                Url = "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop", // Imagem representativa de placa de vídeo
                IsPrimary = true
            },
            new ProductImage
            {
                Id = Guid.Parse("77777777-5555-1111-1111-111111111111"),
                ProductId = cpuId,
                Url = "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800&auto=format&fit=crop", // Imagem representativa de processador
                IsPrimary = true
            }
        );

        // Simplified mapping for clean architecture. Realistically, we'd use IEntityTypeConfiguration
        modelBuilder.Entity<User>().HasMany(u => u.Addresses).WithOne(a => a.User).HasForeignKey(a => a.UserId);
        modelBuilder.Entity<User>().HasMany(u => u.Orders).WithOne(o => o.User).HasForeignKey(o => o.UserId).OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Order>().HasOne(o => o.ShippingAddress).WithMany().HasForeignKey(o => o.ShippingAddressId).OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<Category>().HasMany(c => c.Products).WithOne(p => p.Category).HasForeignKey(p => p.CategoryId);

        modelBuilder.Entity<Product>().HasMany(p => p.Images).WithOne(i => i.Product).HasForeignKey(i => i.ProductId);
        modelBuilder.Entity<Product>().Property(p => p.Price).HasColumnType("decimal(18,2)");

        modelBuilder.Entity<Cart>().HasMany(c => c.Items).WithOne(i => i.Cart).HasForeignKey(i => i.CartId);
        modelBuilder.Entity<CartItem>().Property(i => i.UnitPrice).HasColumnType("decimal(18,2)");

        modelBuilder.Entity<Order>().HasMany(o => o.Items).WithOne(i => i.Order).HasForeignKey(i => i.OrderId);
        modelBuilder.Entity<Order>().HasOne(o => o.Payment).WithOne(p => p.Order).HasForeignKey<Payment>(p => p.OrderId);
        modelBuilder.Entity<Order>().Property(o => o.TotalAmount).HasColumnType("decimal(18,2)");

        modelBuilder.Entity<OrderItem>().Property(i => i.UnitPrice).HasColumnType("decimal(18,2)");
        modelBuilder.Entity<OrderItem>().Property(i => i.TotalPrice).HasColumnType("decimal(18,2)");

        modelBuilder.Entity<Payment>().Property(p => p.Amount).HasColumnType("decimal(18,2)");
        modelBuilder.Entity<Coupon>().Property(c => c.DiscountValue).HasColumnType("decimal(18,2)");
    }
}
