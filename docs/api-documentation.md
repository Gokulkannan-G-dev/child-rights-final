# API Documentation

Base URL: `/api/v1`

## Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (auth required)
- `POST /auth/forgot-password`
- `POST /auth/verify-account`
- `POST /auth/professional-verification` (auth required)

## Reports (public)
- `POST /reports`
- `POST /reports/:id/attachments`
- `GET /reports/track/:refCode`
- `GET /report-categories`

## Cases (reviewer/admin only)
- `GET /cases?status=`
- `GET /cases/:id`
- `PATCH /cases/:id`
- `POST /cases/:id/notes`
- `POST /cases/:id/escalate`
- `GET /cases/:id/audit-log`

## Content, resources, events, campaigns
- Standard CRUD under `/content/articles`, `/resources`, `/events`, `/campaigns`.
- Reads are public; writes require an admin role.

## Admin (admin only)
- `GET /admin/users`, `PATCH /admin/users/:id`
- `GET /admin/verification-requests`, `PATCH /admin/verification-requests/:id`
- `GET /admin/reports-export?range=`
- `GET /admin/organizations`, `GET /admin/report-categories`

## Analytics (admin only)
- `GET /analytics/summary`
- `GET /analytics/case-trends`
