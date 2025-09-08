# Important information after deployment
output "app_url" {
  description = "Public URL of your Restaurant API"
  value       = "https://${azurerm_container_app.main.ingress[0].fqdn}"
}

output "swagger_url" {
  description = "Swagger UI URL for testing your API"
  value       = "https://${azurerm_container_app.main.ingress[0].fqdn}/swagger"
}

output "acr_name" {
  description = "Container Registry name (for docker push commands)"
  value       = azurerm_container_registry.main.name
}