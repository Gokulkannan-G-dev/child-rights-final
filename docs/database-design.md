# Database Design (MongoDB / Mongoose)

## Collections

- **users** — name, email, passwordHash, role (reporter/reviewer/admin), isVerified, mfaEnabled
- **reports** — refCode, category, urgency, description, location, isAnonymous, contact,
  attachments[], language, case (ref)
- **cases** — report (ref), refCode, status, assignedTo (ref User), escalatedTo { organizationName, note, escalatedAt }
- **internalnotes** — case (ref), author (ref User), note
- **auditlogs** — case (ref), actor (ref User), actorLabel, action, timestamp
- **resources**, **articles**, **events**, **campaigns** — content-management collections
- **notifications** — user (ref), message, read
- **verificationrequests** — user (ref), organization, role, fileName, status

## Design notes

- A `Report` and its `Case` are separate documents: the report holds what was submitted, the
  case holds the internal workflow state. This keeps the original reporter submission immutable
  while the case evolves through review.
- PII (reporter contact details) lives inside `reports.contact`, not the `cases` collection, so
  that case-list views used by most caseworkers don't need to touch identity fields at all.
