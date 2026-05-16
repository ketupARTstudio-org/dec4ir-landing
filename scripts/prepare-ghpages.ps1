#Requires -Version 5.1
param(
    [switch]$SkipBuild
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$Root = Split-Path $PSScriptRoot -Parent
Set-Location $Root

function Write-Step([string]$Text) {
    Write-Host ''
    Write-Host "==> $Text" -ForegroundColor Cyan
}

function Abort([string]$Text) {
    Write-Host ''
    Write-Host "ERROR: $Text" -ForegroundColor Red
    exit 1
}

# 1. Build
if (-not $SkipBuild) {
    Write-Step 'Building static export...'
    $env:NEXT_PUBLIC_BASE_PATH = ''
    npm run build
    if ($LASTEXITCODE -ne 0) { Abort 'npm build failed.' }
}

$BuildOut = Join-Path $Root '.next-static'
if (-not (Test-Path $BuildOut)) {
    Abort '.next-static\ not found. Run without -SkipBuild or build manually first.'
}

# 2. Sync to docs/
Write-Step 'Syncing build output to docs/...'

$Docs = Join-Path $Root 'docs'

foreach ($dir in @('_next', '_not-found')) {
    $target = Join-Path $Docs $dir
    if (Test-Path $target) {
        Remove-Item -Recurse -Force $target
    }
}

Copy-Item -Path "$BuildOut\*" -Destination $Docs -Recurse -Force

Write-Host ''
Write-Host 'docs/ is ready. Review the changes, then commit and push manually.' -ForegroundColor Green
Write-Host '  git add docs' -ForegroundColor DarkGray
Write-Host '  git commit -m "deploy: update GitHub Pages"' -ForegroundColor DarkGray
Write-Host '  git push origin main' -ForegroundColor DarkGray
