# ScanSpy

Production-grade full-stack web directory and file discovery scanner.

## Stack

- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express
- Streaming: Server-Sent Events (SSE)
- Storage: in-memory scan sessions (no database)

## Monorepo

```
scanspy/
├── client/
├── extension/
├── server/
└── package.json
```

## Run Locally

```bash
npm install
npm run dev:server
npm run dev:client
```

- Server: `http://localhost:3001`
- Client: `http://localhost:5173`
- CORS is enabled for local dev client origin.

## Build + Production Serve

```bash
npm run build
NODE_ENV=production npm start
```

In production mode, Express serves the built frontend from `client/dist` on port `3001`.

## API

- `POST /api/scan/start`
  - Body: `{ targetUrl: string, wordlist: "small" | "medium" | "large" }`
  - Response: `{ scanId: string }`
- `GET /api/scan/:scanId`
- `GET /api/scan/:scanId/stream` (SSE)
- `POST /api/scan/:scanId/cancel`

## Scanner Details

- HEAD requests against generated path wordlist (200+ entries for `small`, more for larger lists)
- 10 concurrent requests per batch
- 100ms delay between batches
- Reads `robots.txt` and flags disallowed hits
- Risk levels: High / Medium / Low / Info

## Epoch '26 Notes

- Upload any folder related to code.
- If you have a separate backend and frontend, upload them in 2 different folders.
- Upload the code before 11am.
