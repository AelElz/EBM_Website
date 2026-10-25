# EBM authentication test: what exists and what comes next

## Current stage

The custom page is a frontend prototype. Its demonstration result is **not authentication**, does not create a website account in PostgreSQL, and does not connect to Eduka. Use invented information and a password you do not use elsewhere. Do not use an Eduka password.

To try it, open [Espace Eduka](http://127.0.0.1:3100/espace-eduka), use the small bottom link **Tester la connexion**, or open [the test page](http://127.0.0.1:3100/connexion-test) directly. Choose **Utiliser un exemple fictif**, then test the login or account-creation form. The confirmation is explicitly a preview; it is not a signed-in session.

PostgreSQL **18.6 (Homebrew)** is now installed natively. The local server listens only on **127.0.0.1:5432** and has no login auto-start. The dedicated `ebm_auth_test` database and isolated `test_auth.accounts` / `test_auth.sessions` tables exist. All **14 transactional schema checks passed**, and rollback left both tables empty. See [database setup, commands and validation](../database/auth-test/README.md).

The frontend remains disconnected. No Node authentication API, container or Eduka integration was added. Homebrew initialized local trust authentication; use a least-privilege application role and password authentication before real data or shared use.

## The system to build

```text
Browser form → Node.js API → PostgreSQL
                     └── future verified Eduka integration, if authorized
```

The browser displays the form and sends HTTPS requests. Node validates input, checks passwords, controls sessions and reads/writes the database. One PostgreSQL database stores one account row per registered user, plus session hashes. Registration creates an account row; login verifies an existing account and creates a session. The browser never connects directly to PostgreSQL.

Docker later packages a service and its runtime. It is not the API, and the Node service can run locally without it. This project already runs Next.js/Payload on Node; Next.js Route Handlers are one option. A separate Node service is also possible if you want its own deployment. Choose one owner for these endpoints rather than implementing both.

**Three identities stay separate:** this website's test account, a Payload staff/CMS account, and an Eduka family account. A working website login does not log a family into Eduka or authorize access to its records. Eduka requires its documented API/SSO support and school authorization.

## Proposed future HTTP contract

Base path: `/api/v1/auth`. Implement these endpoints on Node, not in the current frontend prototype.

| Endpoint | Request | Confirmed server result |
| --- | --- | --- |
| `POST /register` | `{firstName,lastName,email,password,campus}` | `201` with safe `account` data and `session.expiresAt`, after the transaction commits; set the session cookie |
| `POST /login` | `{email,password}` | `200` with safe `account` data and `session.expiresAt`; rotate/set the session cookie |
| `GET /session` | Cookie only | `200` with safe `account` and `session.expiresAt`, or `401` if absent/expired/revoked |
| `POST /logout` | Cookie only | Revoke the session, expire the cookie and return `204`; repeating logout is safe |

`campus` is exactly `"casablanca"` or `"rabat"`. Safe `account` data is `{id,firstName,lastName,email,campus}`; never return a password, its hash, or a session token in JSON. Errors use `{error:{code,message,fieldErrors?}}` with no stack traces or database details.

Validate all fields on Node even when the browser validates them. Trim names/email, preserve password bytes, use parameterized SQL, and handle the unique `lower(email)` constraint. Use a generic invalid-credentials response for login. Define a consistent registration conflict/recovery policy before public use; the test schema alone does not provide email verification or password reset.

## Passwords and sessions

- Hash passwords **on the server** with a maintained Argon2id implementation, or Node's asynchronous scrypt when appropriate. Store an encoded hash with its parameters and random salt, never plaintext or reversible encryption.
- Generate a cryptographically random opaque session token. Store only its SHA-256 digest in `test_auth.sessions`. Hashing a high-entropy token is different from hashing a human password.
- Deliver the raw token only through an `HttpOnly`, `Secure`, `SameSite=Lax` cookie over HTTPS, with a narrow lifetime and `Path=/`. Use an explicitly local-development cookie policy when testing HTTP on localhost. Never store the token in localStorage or expose it to frontend JavaScript.
- Check expiration and revocation on every authenticated request. Rotate sessions on login, revoke on logout, and clean up expired sessions. Add server-side authorization separately from sign-in.
- For write requests, validate the Origin and implement CSRF protection suitable for the deployment. Limit authentication attempts server-side, avoid logging credentials, and use `Cache-Control: no-store` on auth responses.
- Same-origin requests with `credentials: "include"` are simplest. A separate service needs an explicit allowed frontend origin and credentialed CORS; wildcard CORS cannot be used with credentialed requests.

## Failures and retries

A disabled submit button prevents accidental repeated clicks; it is not duplicate protection. Registration must insert the account and initial session in one database transaction. If the network fails, the browser must not claim success: the server may have committed even though the response was lost. Check `GET /session` first; otherwise let the user sign in. A retry must never overwrite an existing account or reset its password. Add durable, expiring idempotency handling if automatic registration retries are introduced.

Do not replay passwords in a queue or background sync. Keep them out of URLs, analytics, logs, local/session storage and draft persistence. The frontend should show a clear unavailable/error state until a real API confirms the result.

## Small next steps

1. Review the form using invented details. Agree which data is actually needed.
2. Inspect the installed local database using its README. The schema is already applied; do not rerun it or add real family records for the prototype.
3. Implement Node registration/login/session/logout against that database; keep its connection string server-only.
4. Connect the frontend transport, then test duplicate email, invalid password, expiry, logout, unavailable backend and interrupted registration.
5. Add email verification/recovery and production access/security settings before real families use it.
6. Package the Node service in Docker when useful. Plan verified Eduka integration separately.

Official references: [Node crypto](https://nodejs.org/api/crypto.html), [OWASP password storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html), [PostgreSQL constraints](https://www.postgresql.org/docs/current/ddl-constraints.html).

