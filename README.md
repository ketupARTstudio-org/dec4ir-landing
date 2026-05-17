<img src="public/logos/logo-favicon.svg" alt="DEC4IR logo" height="80">

This is a [Next.js](https://nextjs.org)/[React](https://react.dev/) SPA for DEC4IR 2026 - an online drone education quiz competition landing page with event schedule, sponsor showcase, and FAQ. Production builds emit plain HTML/CSS/JS into `out/` and can be served by any static web server.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app locally.

Create a production export with:

```bash
npm run build
```

The static site will be written to `out/`.

Build target selection via `NEXT_PUBLIC_BASE_PATH`:

- GitHub Pages project path (`/dec4ir-landing`):
  - PowerShell: `$env:NEXT_PUBLIC_BASE_PATH='/dec4ir-landing'; npm.cmd run build`
- Custom domain root (`/`):
  - PowerShell: `Remove-Item Env:NEXT_PUBLIC_BASE_PATH -ErrorAction SilentlyContinue; npm.cmd run build`

Serve the exported files locally with:

```bash
npm start
```

## Deploy to GitHub Pages

Use the PowerShell script at `scripts/prepare-ghpages.ps1` to build and sync the output to `docs/`:

```powershell
.\scripts\prepare-ghpages.ps1
```

This builds for domain root (`/`), then syncs the output into `docs/`. Once done, review the changes and push:

```powershell
git add docs
git commit -m "deploy: update GitHub Pages"
git push origin main
```

Pass `-SkipBuild` to skip the build step and only re-sync an existing `.next-static/` output:

```powershell
.\scripts\prepare-ghpages.ps1 -SkipBuild
```

## Docker

Serve the exported site with Docker:

```bash
docker compose up --build
```

This builds the app and serves the generated `out/` directory from Nginx on port `80`.

## Notes

- `next.config.ts` uses `output: 'export'`.
- `NEXT_PUBLIC_BASE_PATH` controls whether the export is built for a subpath (for example `/dec4ir-landing`) or for domain root (`/`).
- `next/image` is configured as unoptimized because the built-in image optimizer requires a server runtime.
- `npm start` serves the generated `out/` folder with a small Node static server.
