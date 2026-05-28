# IndexNow Manual Push Script
# Usage:
#   .\scripts\indexnow-push.ps1 -Url "https://mescalculateurs.com" -Token "YOUR_ADMIN_TOKEN"
#
# Or set env var and run:
#   $env:ADMIN_STATS_TOKEN = "..."
#   .\scripts\indexnow-push.ps1

param(
  [string]$Url = "https://mescalculateurs.fr",
  [string]$Token = $env:ADMIN_STATS_TOKEN
)

if (-not $Token) {
  Write-Host "ERROR: ADMIN_STATS_TOKEN not set. Provide via -Token param or env var." -ForegroundColor Red
  exit 1
}

$ApiEndpoint = "$Url/api/indexnow"

Write-Host "Triggering IndexNow push to Bing/Yandex..." -ForegroundColor Cyan
Write-Host "Endpoint: $ApiEndpoint"

try {
  $response = Invoke-WebRequest `
    -Uri $ApiEndpoint `
    -Method Get `
    -Headers @{ "x-admin-token" = $Token } `
    -ContentType "application/json"

  $result = $response.Content | ConvertFrom-Json

  Write-Host "SUCCESS: IndexNow push completed" -ForegroundColor Green
  Write-Host "URLs pushed: $($result.pushed)" -ForegroundColor Green
  Write-Host "URLs failed: $($result.failed)" -ForegroundColor Yellow
  Write-Host "Total URLs in sitemap: $($result.totalUrls)" -ForegroundColor Cyan

  exit 0
}
catch {
  Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
  if ($_.Exception.Response) {
    Write-Host "HTTP Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
  }
  exit 1
}
