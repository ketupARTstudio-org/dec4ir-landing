#Requires -Version 5.1
param(
    [string]$Message = 'deploy: update GitHub Pages',
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

# 3. Commit & push
Write-Step 'Committing docs/...'

git add docs
$status = git status --porcelain docs
if (-not $status) {
    Write-Host 'Nothing changed in docs/ -- already up to date.' -ForegroundColor Yellow
    exit 0
}

git commit -m $Message
if ($LASTEXITCODE -ne 0) { Abort 'git commit failed.' }

Write-Step 'Pushing to origin/main...'
git push origin main
if ($LASTEXITCODE -ne 0) { Abort 'git push failed.' }

Write-Host ''
Write-Host 'Deployed! GitHub Pages will update at https://dec4ir.com in ~1 minute.' -ForegroundColor Green
