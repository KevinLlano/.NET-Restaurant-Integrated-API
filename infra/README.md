# Azure Static Web App Deployment

This folder contains Terraform configuration to provision Azure Static Web Apps for the restaurant-client Angular frontend.

## Prerequisites

- Azure CLI installed and authenticated (`az login`)
- Terraform installed (>= 1.0)

## Usage

1. **Initialize Terraform:**
   ```bash
   cd infra
   terraform init
   ```

2. **Preview changes:**
   ```bash
   terraform plan
   ```

3. **Apply (create resources):**
   ```bash
   terraform apply
   ```

4. **Get deployment token:**
   ```bash
   terraform output -raw deployment_token
   ```
   Copy this token and add it to GitHub Secrets as `AZURE_STATIC_WEB_APPS_API_TOKEN`

5. **Get your app URL:**
   ```bash
   terraform output static_web_app_url
   ```

## GitHub Secrets Required

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon/public key
- `AZURE_STATIC_WEB_APPS_API_TOKEN` - Deployment token from Terraform output

## Cost

- **Azure Static Web Apps (Free tier)**: $0/month
  - 100 GB bandwidth per month
  - Custom domains included
  - SSL certificates included

## Clean Up

To delete all Azure resources:
```bash
cd infra
terraform destroy
```
