This is a static-exported [Next.js](https://nextjs.org) landing page. Production builds emit plain HTML/CSS/JS into `out/` and can be served by any static web server.

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

Serve the exported files locally with:

```bash
npm start
```

## Docker

Serve the exported site with Docker:

```bash
docker compose up --build
```

This builds the app and serves the generated `out/` directory from Nginx on port `80`.

## Notes

- `next.config.ts` uses `output: 'export'`.
- `next/image` is configured as unoptimized because the built-in image optimizer requires a server runtime.
- `npm start` serves the generated `out/` folder with a small Node static server.
