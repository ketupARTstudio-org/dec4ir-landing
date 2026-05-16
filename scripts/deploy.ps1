#Requires -Version 5.1
<#
.SYNOPSIS
    Build and deploy the Next.js static export to GitHub Pages (docs/ branch source).
.PARAMETER Message
    Custom git commit message. Defaults to "deploy: update GitHub Pages".
.PARAMETER SkipBuild
    Skip the npm build step and only sync + push the existing .next-static output.
#>
param(
    [string]$Message = "deploy: update GitHub Pages",
    [switch]$SkipBuild
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Root = Split-Path $PSScriptRoot -Parent
Set-Location $Root

function Write-Step([string]$Text) {
    Write-Host "`n==> $Text" -ForegroundColor Cyan
}

function Abort([string]$Text) {
    Write-Host "`nERROR: $Text" -ForegroundColor Red
    exit 1
}

# ── 1. Build ──────────────────────────────────────────────────────────────────
if (-not $SkipBuild) {
    Write-Step "Building static export..."
    $env:NEXT_PUBLIC_BASE_PATH = ""
    npm run build
    if ($LASTEXITCODE -ne 0) { Abort "npm build failed." }
}

$BuildOut = Join-Path $Root ".next-static"
if (-not (Test-Path $BuildOut)) {
    Abort ".next-static\ not found. Run without -SkipBuild or build manually first."
}

# ── 2. Sync to docs/ ──────────────────────────────────────────────────────────
Write-Step "Syncing build output to docs/..."

$Docs = Join-Path $Root "docs"

# Remove stale Next.js output dirs (regenerated each build)
foreach ($dir in @("_next", "_not-found")) {
    $target = Join-Path $Docs $dir
    if (Test-Path $target) {
        Remove-Item -Recurse -Force $target
    }
}

# Copy everything from the build output into docs/
# CNAME and .nojekyll stay untouched because they don't exist in .next-static
Copy-Item -Path "$BuildOut\*" -Destination $Docs -Recurse -Force

# ── 3. Commit & push ──────────────────────────────────────────────────────────
Write-Step "Committing docs/..."

git add docs
$status = git status --porcelain docs
if (-not $status) {
    Write-Host "Nothing changed in docs/ — already up to date." -ForegroundColor Yellow
    exit 0
}

git commit -m $Message
if ($LASTEXITCODE -ne 0) { Abort "git commit failed." }

Write-Step "Pushing to origin/main..."
git push origin main
if ($LASTEXITCODE -ne 0) { Abort "git push failed." }

Write-Host "`nDeployed! GitHub Pages will update at https://dec4ir.com in ~1 minute." -ForegroundColor Green
