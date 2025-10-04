# Multi-stage build for .NET 9 application
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["RestaurantAPI/RestaurantAPI.csproj", "RestaurantAPI/"]
RUN dotnet restore "RestaurantAPI/RestaurantAPI.csproj"

COPY . .
WORKDIR "/src/RestaurantAPI"
RUN dotnet build "RestaurantAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RestaurantAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RestaurantAPI.dll"]