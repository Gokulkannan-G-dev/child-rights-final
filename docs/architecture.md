# Architecture

## Overview

Three-tier architecture: React (Vite) frontend, Node.js/Express REST API, MongoDB database.

```
Client (React)  →  API (Express)  →  Database (MongoDB)
                       ↓
              Encrypted file storage (uploads)
                       ↓
          Partner NGO / government integrations (future)
```

## Frontend

- Vite + React Router, plain CSS (no framework), organized by domain under `src/pages`.
- `src/services/` holds one fetch-wrapper module per backend resource.
- `src/context/` holds global state: auth session and notifications.

## Backend

- Express app (`app.js`) wires versioned routes under `/api/v1`.
- Mongoose models under `backend/models/` mirror the resources in the planning document's
  Modules and Functionalities section (Report, Case, InternalNote, AuditLog, Resource, Article,
  Event, Campaign, Notification, VerificationRequest, User).
- `backend/middleware/authMiddleware.js` and `roleMiddleware.js` enforce authentication and
  role-based access control on every sensitive route.

## Not yet implemented (see README)

- Field-level encryption of sensitive report/case fields.
- Real email/SMS providers (currently stubbed in `backend/services/`).
- Real evidence metadata stripping (currently a scaffold in `backend/utils/removeMetadata.js`).
