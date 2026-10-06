[README.md](https://github.com/user-attachments/files/33099484/README.md)
# Child Rights Reporting Platform

A full-stack platform for reporting concerns about a child's safety or rights, reviewing those
reports as cases, and managing supporting awareness content — built with React (Vite) on the
frontend and Node.js/Express + MongoDB on the backend.

This repository's structure follows the project's planning document: see `docs/architecture.md`,
`docs/api-documentation.md`, and `docs/database-design.md` for the full design reference.

## Project structure

```
frontend/   React (Vite) single-page app — public pages, auth, reporting flow,
            reviewer console, admin console, and user profile
backend/    Node.js/Express REST API + MongoDB models
docs/       Architecture, API, and database design references
```

## Getting started

### Backend

```bash
cd backend
npm install
cp .env.example .env   # adjust MONGO_URI, JWT_SECRET, etc.
npm run dev
```

Runs at `http://localhost:5000`, exposing the API under `/api/v1`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173` and proxies `/api` requests to the backend during development
(see `frontend/vite.config.js`).

## Where the original prototype went

The earlier single-file prototype (`final-project-v3/`) — the login screen, the Report form, Case
Review table, Awareness grid, and Sidebar — has been restructured into this architecture rather
than discarded:

| Old file | New home |
|---|---|
| `App.js` login screen | `frontend/src/pages/auth/Login.jsx` |
| `Report.js` | Split across `frontend/src/pages/reporting/*.jsx` (multi-step flow) |
| `CaseReview.js` | `frontend/src/pages/reviewer/CaseQueue.jsx` + `CaseDetails.jsx` |
| `Awareness.js` | `frontend/src/pages/public/Awareness.jsx` |
| `Sidebar.js`, `Button.js` | `frontend/src/components/` |
| In-memory `SEED_REPORTS` state | Replaced with real API calls to the Express/MongoDB backend |

## Notes

- Authentication uses JWT; MFA, email, and SMS sending are stubbed in `backend/services/` with
  clear extension points — wire in real providers before production use.
- File uploads are stored locally under `backend/uploads/`; metadata stripping in
  `backend/utils/removeMetadata.js` is a scaffold and should be completed with a real library
  before handling real evidence uploads.
- See the planning document's Security and Compliance section before deploying: this scaffold
  does not yet implement field-level encryption, audit-log export, or jurisdiction-specific
  mandatory-reporting routing.
