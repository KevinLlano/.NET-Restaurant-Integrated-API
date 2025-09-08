# Core variables 
variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "restaurant-api"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "East US"
}

variable "acr_name" {
  description = "Azure Container Registry name"
  type        = string
  default     = "kevinrestaurantacr01" 
}

variable "image_name" {
  description = "Container image name"
  type        = string
  default     = "restaurant-api"
}

variable "image_tag" {
  description = "Container image tag"
  type        = string
  default     = "latest"
}