# Angular + ASP.NET Core Restaurant Management

This is a simple restaurant management application with an Angular frontend and ASP.NET Core Web API backend.

## Prerequisites

- Node.js (v18 or later)
- Angular CLI (`npm install -g @angular/cli`)
- .NET 9 SDK
- SQL Server or SQL Server Express

## Backend Setup (ASP.NET Core API)

1. Navigate to the API directory:
   ```bash
   cd RestaurantAPI/RestaurantAPI
   ```

2. Update the connection string in `appsettings.json` if needed.

3. Run the API:
   ```bash
   dotnet run
   ```

The API will run on `https://localhost:7264` by default.

## Frontend Setup (Angular)

1. Navigate to the frontend directory:
   ```bash
   cd restaurant-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update the API URL in `src/environments/environment.ts` if your backend runs on a different port.

4. Start the Angular development server:
   ```bash
   ng serve
   ```

The Angular app will run on `http://localhost:4200` by default.

## Features

- **Food Items Management**: View, add, and delete food items
- **Customer Management**: View, add, and delete customers
- **Responsive Design**: Clean, modern UI with Bootstrap-like styling
- **Error Handling**: Proper error messages for API failures

## API Endpoints

### Food Items
- `GET /api/FoodItem` - Get all food items
- `GET /api/FoodItem/{id}` - Get a specific food item
- `POST /api/FoodItem` - Create a new food item
- `PUT /api/FoodItem/{id}` - Update a food item
- `DELETE /api/FoodItem/{id}` - Delete a food item

### Customers
- `GET /api/Customer` - Get all customers
- `GET /api/Customer/{id}` - Get a specific customer
- `POST /api/Customer` - Create a new customer
- `PUT /api/Customer/{id}` - Update a customer
- `DELETE /api/Customer/{id}` - Delete a customer

## Project Structure

### Frontend (Angular)
```
src/
├── app/
│   ├── components/
│   │   ├── food-items/
│   │   └── customers/
│   ├── models/
│   │   ├── food-item.model.ts
│   │   └── customer.model.ts
│   ├── services/
│   │   ├── food-item.service.ts
│   │   └── customer.service.ts
│   └── ...
└── environments/
    ├── environment.ts
    └── environment.prod.ts
```

### Backend (ASP.NET Core)
```
RestaurantAPI/
├── Controllers/
├── Models/
├── DTOs/
├── Migrations/
└── Program.cs
```

## Technologies Used

### Frontend
- Angular 18
- TypeScript
- RxJS
- Angular HTTP Client
- SCSS

### Backend
- ASP.NET Core 9
- Entity Framework Core
- SQL Server
- JWT Authentication (configured but not used in basic setup)

## Next Steps

This is a basic setup to get you started. You can extend it by:

1. Adding authentication/authorization
2. Implementing order management
3. Adding validation
4. Creating more detailed forms
5. Adding pagination
6. Implementing search functionality
7. Adding unit tests

## Troubleshooting

- **CORS Issues**: Make sure the backend CORS policy includes your Angular app's URL
- **Connection Issues**: Verify the API URL in `environment.ts` matches your backend URL
- **Database Issues**: Check your connection string and ensure SQL Server is running