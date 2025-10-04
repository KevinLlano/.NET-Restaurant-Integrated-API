# Restaurant Management API

[![.NET](https://img.shields.io/badge/.NET-9.0-blue)](https://dotnet.microsoft.com/)
[![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-9.0-green)](https://docs.microsoft.com/en-us/aspnet/core/)
[![Entity Framework](https://img.shields.io/badge/Entity_Framework_Core-9.0-purple)](https://docs.microsoft.com/en-us/ef/core/)
[![SQL Server](https://img.shields.io/badge/SQL_Server-Express-orange)](https://www.microsoft.com/en-us/sql-server)
[![Docker](https://img.shields.io/badge/Docker-Enabled-blue)](https://www.docker.com/)
[![Azure](https://img.shields.io/badge/Azure-Container_Apps-blue)](https://azure.microsoft.com/en-us/services/container-apps/)
[![Terraform](https://img.shields.io/badge/Terraform-Infrastructure_as_Code-purple)](https://www.terraform.io/)

A comprehensive, production-ready REST API for restaurant management, built with modern .NET technologies. This project demonstrates full-stack development skills, including backend API design, database management, authentication, containerization, and cloud deployment. Perfect for showcasing expertise in enterprise-level application development and DevOps practices.

## 🚀 Project Overview

This API manages restaurant operations including customer data, menu items, and order processing with master-detail relationships. It features clean architecture with DTOs, JWT authentication, Swagger documentation, and automated deployment to Azure using Terraform. The solution is designed for scalability, maintainability, and cloud-native deployments.

### Key Highlights
- **Modern Tech Stack**: .NET 9, ASP.NET Core Web API, Entity Framework Core
- **Database**: SQL Server with robust entity relationships
- **Authentication**: JWT-based security for protected operations
- **Documentation**: Interactive Swagger UI
- **Deployment**: Docker containerization and Azure Container Apps
- **Infrastructure as Code**: Terraform for automated cloud provisioning
- **Security**: Proper secrets management and configuration templates

## 🛠️ Tech Stack

- **Backend**: .NET 9 SDK, ASP.NET Core Web API
- **Database**: Entity Framework Core with SQL Server
- **Authentication**: JWT Bearer Tokens
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker
- **Cloud**: Azure Container Apps, Azure Container Registry
- **IaC**: Terraform
- **Development Tools**: Visual Studio 2022, Git

## ✨ Features

- **Customer Management**: CRUD operations for customer data
- **Menu Management**: Full CRUD for food items with pricing
- **Order Processing**: Master-detail order management with line items
- **Authentication**: JWT token-based security
- **API Documentation**: Interactive Swagger UI
- **Database Migrations**: EF Core code-first approach
- **Containerization**: Docker support for easy deployment
- **Cloud Deployment**: Automated Azure infrastructure provisioning

## 📋 Prerequisites

- .NET 9 SDK (`dotnet --version`)
- SQL Server (Express or LocalDB)
- Git
- EF Core tools: `dotnet tool install --global dotnet-ef`
- Azure CLI (for cloud deployment)
- Docker (optional, for containerization)

## 🏃‍♂️ Quick Start

1. **Clone and navigate**:
   ```bash
   git clone https://github.com/KevinLlano/.NET-Restaurant-Integrated-API.git
   cd .NET-Restaurant-Integrated-API/RestaurantAPI
   ```

2. **Setup database**:
   ```bash
   dotnet ef database update --context RestaurantDbContext
   ```

3. **Run the API**:
   ```bash
   dotnet run
   ```

4. **Access Swagger**: Open `http://localhost:5000/swagger` in your browser

## 📖 API Endpoints

### Customers
- `GET /api/Customer` - List all customers

### Food Items
- `GET /api/FoodItem` - List all menu items
- `GET /api/FoodItem/{id}` - Get specific item
- `POST /api/FoodItem` - Create new item (authenticated)
- `PUT /api/FoodItem/{id}` - Update item (authenticated)
- `DELETE /api/FoodItem/{id}` - Delete item (authenticated)

### Orders
- Explore available endpoints in Swagger UI

### Authentication
- `POST /api/auth/token` - Get JWT token
  - Body: `{"username": "admin", "password": "password"}`

## 🔐 Authentication

The API includes JWT authentication to protect write operations. Use the demo credentials for testing:
- **Username**: admin
- **Password**: password

Add the Bearer token to protected requests via the Authorization header.

## 🏗️ Architecture

### Database Schema
- **Customer**: Customer information with order relationships
- **FoodItem**: Menu items with pricing
- **OrderMaster**: Order headers with customer references
- **OrderDetail**: Order line items with quantities and prices

### DTO Pattern
Clean data transfer objects for API contracts:
- `CustomerCreateDto`
- `OrderCreateDto`
- `OrderDetailCreateDto`

### Clean Architecture
- Controllers for API endpoints
- Services for business logic
- Models for data entities
- DTOs for data transfer

## ☁️ Cloud Deployment

### Terraform Infrastructure
Automated deployment to Azure Container Apps with:
- Azure Container Registry for image storage
- Container Apps Environment
- Managed identity for secure access
- Log Analytics for monitoring

### Deployment Steps
1. Configure Azure CLI: `az login`
2. Update `terraform/variables.tf` with unique names
3. Deploy: `cd terraform && terraform apply`
4. Build and push Docker image
5. Access via the generated URLs

## 🛡️ Security & Best Practices

- JWT authentication with proper token validation
- Secrets management using user-secrets and environment variables
- Configuration templates to avoid committing sensitive data
- Proper error handling and input validation
- CORS configuration for frontend integration

## 📸 Screenshots

![Docker Compose](image.png)
![Azure Container App](image-1.png)
![Schema](image-2.png)
![Swagger UI](image-3.png)
![200 OK Response](image-4.png)


## DO IT YOURSELF GUIDE, STEP BY STEP (Visual Studio 2022)
These steps work for either the "ASP.NET Core Web API" template or the "ASP.NET Core Web App (Model-View-Controller)" template. This project uses API controllers; the Web API template is recommended.

1) **Create the solution and project**
   - File > New > Project > ASP.NET Core Web API
   - Framework: .NET 9, Enable controllers + OpenAPI support

2) **Add EF Core packages** via NuGet Package Manager:
   - `Microsoft.EntityFrameworkCore.SqlServer`
   - `Microsoft.EntityFrameworkCore.Design`

3) **Add connection string** to `appsettings.json`:
```json
"ConnectionStrings": {
  "DevConnection": "Server=localhost\\SQLEXPRESS;Database=RestaurantDB;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=True;"
}
```

4) **Create entity classes** (Models folder):
```csharp
// Customer.cs
public class Customer {
  [Key] public int CustomerID { get; set; }
  [Column(TypeName = "nvarchar(100)")][Required]
  public string CustomerName { get; set; } = string.Empty;
  public virtual ICollection<OrderMaster> Orders { get; set; } = new List<OrderMaster>();
}

// FoodItem.cs
public class FoodItem {
  [Key] public int FoodItemId { get; set; }
  [Column(TypeName = "nvarchar(100)")] public string FoodItemName { get; set; } = string.Empty;
  public decimal Price { get; set; }
}

// OrderMaster.cs
public class OrderMaster {
  [Key] public long OrderMasterId { get; set; }
  [Column(TypeName = "nvarchar(75)")] public string OrderNumber { get; set; } = string.Empty;
  public int CustomerId { get; set; }
  public Customer Customer { get; set; } = null!;
  [Column(TypeName = "nvarchar(10)")] public string PMethod { get; set; } = string.Empty;
  public decimal GTotal { get; set; }
  public List<OrderDetail> OrderDetails { get; set; } = new();
  [NotMapped] public string DeletedOrderItemIds { get; set; } = string.Empty;
}

// OrderDetail.cs
public class OrderDetail {
  [Key] public long OrderDetailId { get; set; }
  public long OrderMasterId { get; set; }
  public int FoodItemId { get; set; }
  public FoodItem FoodItem { get; set; } = null!;
  public decimal FoodItemPrice { get; set; }
  public int Quantity { get; set; }
}
```

5) **Create DbContext** (Models/RestaurantDbContext.cs):
```csharp
public class RestaurantDbContext : DbContext {
  public RestaurantDbContext(DbContextOptions<RestaurantDbContext> options) : base(options) {}
  public DbSet<Customer> Customers => Set<Customer>();
  public DbSet<FoodItem> FoodItems => Set<FoodItem>();
  public DbSet<OrderMaster> OrderMasters => Set<OrderMaster>();
  public DbSet<OrderDetail> OrderDetails => Set<OrderDetail>();
  
  protected override void OnModelCreating(ModelBuilder modelBuilder) {
    // Relationships and constraints
    modelBuilder.Entity<OrderMaster>()
      .HasOne(om => om.Customer).WithMany(c => c.Orders)
      .HasForeignKey(om => om.CustomerId).OnDelete(DeleteBehavior.Restrict);
    modelBuilder.Entity<OrderDetail>()
      .HasOne(od => od.FoodItem).WithMany()
      .HasForeignKey(od => od.FoodItemId).OnDelete(DeleteBehavior.Restrict);
    modelBuilder.Entity<OrderDetail>()
      .HasOne<OrderMaster>().WithMany(om => om.OrderDetails)
      .HasForeignKey(od => od.OrderMasterId).OnDelete(DeleteBehavior.Cascade);
    
    // Decimal precision
    modelBuilder.Entity<FoodItem>().Property(f => f.Price).HasColumnType("decimal(18,2)");
    modelBuilder.Entity<OrderMaster>().Property(om => om.GTotal).HasColumnType("decimal(18,2)");
    modelBuilder.Entity<OrderDetail>().Property(od => od.FoodItemPrice).HasColumnType("decimal(18,2)");
  }
}
```

6) **Register DbContext** in Program.cs:
```csharp
builder.Services.AddDbContext<RestaurantDbContext>(options =>
  options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));

// Auto-migrate on startup (after app = builder.Build())
using (var scope = app.Services.CreateScope()) {
  var db = scope.ServiceProvider.GetRequiredService<RestaurantDbContext>();
  db.Database.Migrate();
}
```

7) **Add controllers** (Controllers folder): FoodItemController (CRUD), CustomerController (GET list)

8) **Create DTOs** (DTOs folder):
```csharp
// CustomerCreateDto.cs
public class CustomerCreateDto {
  [Required] public string CustomerName { get; set; } = string.Empty;
  public List<OrderCreateDto>? Orders { get; set; }
}

// OrderCreateDto.cs
public class OrderCreateDto {
  [Required] public string OrderNumber { get; set; } = string.Empty;
  public string PMethod { get; set; } = string.Empty;
  public List<OrderDetailCreateDto> OrderDetails { get; set; } = new();
}

// OrderDetailCreateDto.cs
public class OrderDetailCreateDto {
  public int FoodItemId { get; set; }
  public int Quantity { get; set; }
  public decimal FoodItemPrice { get; set; }
}
```

9) **Generate and apply migrations** (Package Manager Console):
   - `Add-Migration InitialCreate -Context RestaurantDbContext`
   - `Update-Database -Context RestaurantDbContext`

10) **Run and test**: Press F5 or `dotnet run`, then open Swagger at the printed URL

## Cloud deployment Steps (Terraform + Azure Container Apps)
- Overview:
  - Infrastructure as Code with Terraform (terraform folder). Creates: Resource Group, Log Analytics Workspace (PerGB2018, 30-day retention), Azure Container Registry (Basic), Container Apps Environment, and a Container App with public ingress.
  - Security: Container App uses a system-assigned managed identity; Terraform grants it AcrPull on the ACR. No ACR admin creds in code.
  - Cost: App runs with 0.25 vCPU / 0.5Gi and scales to zero when idle; ACR Basic; minimal Log Analytics retention.
  - Networking: External ingress on port 8080; traffic routes 100% to latest revision.
  - Files: `main.tf` (resources), `variables.tf` (names/region/image), `outputs.tf` (app URL, swagger URL).
- Steps:
  1. Install Azure CLI and login: `az login`
  2. Choose a unique ACR name and set it in `terraform/variables.tf` (or pass `-var="acr_name=..."`)
  3. Deploy infra: `cd terraform && terraform init && terraform apply`
  4. Build & push image: `az acr login --name <acr>` then `docker build -t restaurant-api:latest . && docker tag restaurant-api:latest <acr>.azurecr.io/restaurant-api:latest && docker push <acr>.azurecr.io/restaurant-api:latest`
  5. Get URL: `terraform output -raw app_url` (and `swagger_url`)
- Update workflow:
  - Tag a new image (e.g., `v1`, `v2`) and push, then update `image_tag` in `variables.tf` or pass `-var="image_tag=..."` and run `terraform apply` to create a new revision.
- Cleanup:
  - `terraform destroy` to remove all cloud resources and avoid charges.

## Security Issues Fixed Optimization! 🛡️

#### 🔴 **Issues Found:**
- `appsettings.json` - Contained database connection strings (SENSITIVE)
- `appsettings.Development.json` - Contained development settings (SENSITIVE)

#### ✅ **Actions Taken:**
- Removed sensitive files from git tracking
- Created template files (`appsettings.template.json`, `appsettings.Development.template.json`)
- Updated `.gitignore` to allow template files while excluding actual config files
- Committed the security improvements

## CHALLENGES / TROUBLESHOOTING
- "dotnet-ef not found":
  - `dotnet tool install --global dotnet-ef` and restart terminal.
- "Invalid object name 'FoodItems'":
  - Ensure migrations are applied: `dotnet ef database update`.
  - Verify `ConnectionStrings:DevConnection` points to the expected SQL instance.
- Duplicate FK/CustomerID errors during migration:
  - Ensure this mapping exists in `OnModelCreating`:
    - `modelBuilder.Entity<OrderMaster>()
        .HasOne(om => om.Customer)
        .WithMany(c => c.Orders)
        .HasForeignKey(om => om.CustomerId)
        .OnDelete(DeleteBehavior.Restrict);`
  - If migrations are inconsistent, remove bad ones and recreate:
    - `dotnet ef migrations remove` (repeat until clean) or delete the `Migrations` folder (dev only), then add `InitialCreate` again.

 - Challenges With Terraform: provider schema differences (ingress traffic_weight required, configuration block unsupported in current provider), ACR global name uniqueness, Azure CLI installation on Windows/GitBash missing.


# SCREENSHOTS
![Docker Compose](image.png)
![Azure Container App](image-1.png)
![Schema](image-2.png)
![Swagger UI](image-3.png)
![200 OK Response](image-4.png)