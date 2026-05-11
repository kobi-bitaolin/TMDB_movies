# TMDB Movies

A MERN-stack movie browser backed by [The Movie Database (TMDB)](https://www.themoviedb.org/) API. Users can browse top-rated and now-playing movies, view details and trailers, and — when logged in — save movies to a personal wishlist persisted on the server.

## Features

- Top-rated slider on the home page and now-playing list on the movies page (no login required).
- Movie detail page with TMDB synopsis, poster, rating, and trailer (via `react-player`).
- Email/password auth with hashed passwords (bcrypt) and JWT-based sessions.
- Per-user wishlist stored in MongoDB; add from the detail page, remove from the wishlist page.
- Logged-out users can browse public lists but cannot search or save — they see register/login prompts in those spots.

## Tech stack

- **Client:** React 17 (Create React App), React Router 5, axios, react-player.
- **Server:** Node.js, Express 4, Mongoose 5, jsonwebtoken, bcrypt, Joi.
- **Data:** MongoDB Atlas + TMDB API (proxied through the server so the API key never reaches the browser).

## Project layout

```
TMDB_movies/
├── client/                       # React app (CRA)
│   └── src/
│       ├── auth/AuthContext.js   # JWT storage + axios interceptor
│       ├── components/           # Navbar, Footer, App shell, Slider, Search...
│       └── pages/                # Home, About, Login, Register, WishList, MovieInfo, Search
└── server/                       # Express API
    ├── app.js                    # Entry point, mounts routes
    ├── connectdb.js              # MongoDB connection
    ├── models/user.js            # User schema (includes wishlist subdoc)
    ├── routes/
    │   ├── auth.js               # POST /register, POST /login
    │   ├── wishlist.js           # GET/POST/DELETE wishlist (JWT-gated)
    │   ├── movies.js             # TMDB proxy
    │   └── VerifyToken.js        # JWT middleware
    └── validation.js             # Joi schemas
```

## Prerequisites

- **Node.js 16.x** (see "Node version" note below) and npm
- A MongoDB connection string (Atlas or local)
- A TMDB API key (free, from your [TMDB account settings](https://www.themoviedb.org/settings/api))

### Node version

This project is built on Create React App 4 / webpack 4, which uses MD4 for module hashing. OpenSSL 3 (bundled with Node 17+) removed MD4 from the default provider, so the dev server fails to start on newer Node versions with `ERR_OSSL_EVP_UNSUPPORTED`.

I pinned the runtime to Node 16 (the last release whose OpenSSL 1.1 still supports MD4) so the project runs without any flags or workarounds. The pin is declared via `engines.node` in both `package.json` files, so `npm install` warns if you're on a different version.

Node 16 reached EOL in September 2023; the proper long-term fix is migrating to `react-scripts@5` (webpack 5), which is on my TODO list.

## Setup

Install dependencies in both packages:

```bash
cd server && npm install
cd ../client && npm install
```

Create `server/.env` with:

```
MONGO_DB_URI=mongodb+srv://<user>:<password>@<cluster>/<db>
TOKEN_SECRET=<any long random string>
PORT=5001
TMDB_API_KEY=<your TMDB v3 API key>
```

`server/.env` is listed in `.gitignore` and must never be committed.

## Running

### Recommended: with nvm (Node 16)

With [nvm](https://github.com/nvm-sh/nvm) (or [nvm-windows](https://github.com/coreybutler/nvm-windows) / [fnm](https://github.com/Schniz/fnm)) installed:

```bash
nvm install 16    # one-time, only if you don't already have Node 16
nvm use 16        # switch the current shell to Node 16

cd server
npm run dev       # starts API on :5001 and client on :3000 concurrently
```

Or run them individually:

```bash
# in server/
npm start

# in client/
npm start
```

The client's `package.json` proxies `/api/...` to `http://localhost:5001` in dev.

### Alternative: run on a newer Node with the legacy OpenSSL flag

If you can't use nvm and are on Node 17+, the dev server will crash with `ERR_OSSL_EVP_UNSUPPORTED` (see the "Node version" section for why). You can work around it by setting `NODE_OPTIONS=--openssl-legacy-provider` before starting:

```bash
# macOS / Linux / Git Bash
cd server
NODE_OPTIONS=--openssl-legacy-provider npm run dev
```

```powershell
# Windows PowerShell
cd server
$env:NODE_OPTIONS = "--openssl-legacy-provider"
npm run dev
```

```cmd
:: Windows CMD
cd server
set NODE_OPTIONS=--openssl-legacy-provider
npm run dev
```

`NODE_OPTIONS` is inherited by child processes, so it applies to both the API and the React dev server started by `concurrently`. This is a workaround, not a fix — the proper solution is migrating to `react-scripts@5` (webpack 5).

## API surface

All movie data goes through the server proxy, so the TMDB key never ships to the browser.

| Method | Path                          | Auth | Description                              |
|--------|-------------------------------|------|------------------------------------------|
| POST   | `/api/user/register`          | No   | Create account                           |
| POST   | `/api/user/login`             | No   | Returns `{ token, name }`                |
| GET    | `/api/user/wishlist`          | Yes  | Current user's wishlist                  |
| POST   | `/api/user/wishlist`          | Yes  | Add movie (409 if already present)       |
| DELETE | `/api/user/wishlist/:id`      | Yes  | Remove movie by TMDB id                  |
| GET    | `/api/movies/list/top_rated`  | No   | Proxied TMDB top-rated list              |
| GET    | `/api/movies/list/now_playing`| No   | Proxied TMDB now-playing list            |
| GET    | `/api/movies/search?q=`       | No   | Proxied TMDB search                      |
| GET    | `/api/movies/:id`             | No   | Proxied TMDB movie detail + videos       |

Auth routes accept either `Authorization: Bearer <token>` or the legacy `auth-token` header.

## Auth flow

1. Register → `POST /api/user/register` (Joi-validated, password hashed with bcrypt).
2. Login → `POST /api/user/login` returns `{ token, name }`. The client stores both in `localStorage`.
3. An axios request interceptor (registered in `client/src/auth/AuthContext.js`) attaches `Authorization: Bearer <token>` to every outgoing request — this happens at request time, so it works even on a hard page refresh before any React effect has run.
4. Protected routes use `server/routes/VerifyToken.js`, which decodes the JWT and sets `req.user._id`.
5. Tokens expire after 7 days.

## Notes

- The `client/src/pages/wish-list/wishlist.css` table layout assumes a single `<tbody>` per table.
- The `Search` page disables its input for logged-out users and shows a register prompt; the now-playing cards still load so visitors can browse before signing up.
- `client/README.md` is the unmodified Create React App template and documents only the CRA scripts.
