# MyCryptoAdvisor

Personalized crypto dashboard with onboarding preferences, market data cards, memes, and more. Frontend built with React + Material UI, backend with Node.js + Express + MongoDB.

- Live (Vercel): https://my-crypto-advisor.vercel.app/

## Project Structure - Monorepo

```
MyCryptoAdvisor/
  client/    # React frontend (CRA-based)
  server/    # Node/Express backend
```

## Prerequisites

- Node.js 18+
- npm 8+
- MongoDB connection string (through docker, local or cloud)

## 1) Clone the repository

```bash
git clone https://github.com/OmerBendaa/MyCryptoAdvisor.git
cd MyCryptoAdvisor
```

## 2) Backend setup (Express + MongoDB)

```bash
cd server
npm install
```

Create a `.env` file inside `server/` with:

```bash
MONGO_URI="your_mongodb_connection_string"
PORT=5000
# Optional: if you decide to fetch CryptoPanic from the server
# CRYPTOPANIC_API_TOKEN=your_cryptopanic_token
```

Run the backend in dev mode:

```bash
npm run dev
```

By default the API runs at `http://localhost:5000`.

## 3) Frontend setup (React + MUI)

Open a new terminal tab/window from the project root:

```bash
cd client
npm install
```

If the app uses client-side env vars, create `client/.env` (or `.env.local`) as needed. Example:

```bash
# Example only if you keep client-side base URL overrides
```

Start the frontend:

```bash
npm start
```

By default the app runs at `http://localhost:3000`.

## 4) Environment variables summary

- Backend (`server/.env`)
  - `MONGO_URI` (required): MongoDB connection string
  - `PORT` (optional): Defaults to 5000
  - `CRYPTOPANIC_API_TOKEN` (optional): If you proxy CryptoPanic requests via the server

- Frontend (`client/.env` ) — optional depending on your setup


## 5) Common scripts

- Backend (from `server/`)
  - `npm run dev` — start Express server with nodemon

- Frontend (from `client/`)
  - `npm start` — start the React app

## 6) Notes on external APIs and CORS

- If you call third‑party APIs (e.g., CryptoPanic) directly from the browser, you may hit CORS restrictions.
- Recommended: proxy those requests through the backend (server fetches the API, frontend calls your server).
- If you use a server proxy, keep the third‑party API token in `server/.env` 

## 7) Deployment

- Frontend is deployed to Vercel:
  - Live: https://my-crypto-advisor.vercel.app/
- For backend deployment- Railway

## 8) Troubleshooting

- Frontend cannot reach the backend:
  - Ensure the server is running on `http://localhost:5000`.
  - Verify any frontend env overrides 
- CORS errors calling third‑party APIs:
  - Proxy via the backend and keep tokens server‑side.
- Login issues:
  - Check localStorage for `userToken` and verify the server’s auth endpoints are reachable.

## 9) Development tips

- Maintain consistent styling with Material UI (`@mui/material`).
- Reusable components live under `client/src/components/`.
- User data is fetched via utilities like `client/src/utills/fetchUser.tsx`.

# MyCryptoAdvisor
A personalized AI crypto content advisor
