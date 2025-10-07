terraform {
  required_version = ">= 1.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "restaurant" {
  name     = "rg-restaurant-client"
  location = "East US"  # Free tier available in most regions
}

resource "azurerm_static_site" "restaurant_client" {
  name                = "restaurant-client-app"  # Must be globally unique - change if needed
  resource_group_name = azurerm_resource_group.restaurant.name
  location            = azurerm_resource_group.restaurant.location
  sku_tier            = "Free"
  sku_size            = "Free"
}

output "static_web_app_url" {
  description = "URL of the deployed Static Web App"
  value       = "https://${azurerm_static_site.restaurant_client.default_host_name}"
}

output "deployment_token" {
  description = "Deployment token for GitHub Actions (sensitive)"
  value       = azurerm_static_site.restaurant_client.api_key
  sensitive   = true
}
