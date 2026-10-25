# Local PostgreSQL auth test

## Current state — 25 October 2026

PostgreSQL **18.6 (Homebrew)** is installed natively. The `ebm_auth_test` database exists, and `001_accounts_and_sessions.sql` has been applied once. Its `test_auth.accounts` and `test_auth.sessions` tables are separate from Payload CMS users.

The server is running on **127.0.0.1:5432** with a private Unix socket. It was started through `pg_ctl`; **login auto-start is not enabled**. No Docker, Node auth API, frontend database connection, Eduka integration or persistent seed accounts were added.

The Homebrew cluster uses local `trust` authentication. It is for this machine's isolated prototype; configure a dedicated application role and password authentication before any real family data or shared use.

## Check, stop or start

```sh
EBM_PG_BIN="$(brew --prefix postgresql@18)/bin"
EBM_PG_DATA="$(brew --prefix)/var/postgresql@18"
EBM_PG_SOCKET="$(brew --prefix)/var/ebm-auth-test-socket"
EBM_PG_LOG="$(brew --prefix)/var/log/ebm-auth-test-postgresql.log"

"$EBM_PG_BIN/pg_ctl" -D "$EBM_PG_DATA" status
"$EBM_PG_BIN/pg_isready" -h 127.0.0.1 -p 5432 -d ebm_auth_test

# Stop this cluster when finished testing.
"$EBM_PG_BIN/pg_ctl" -D "$EBM_PG_DATA" -m fast -w stop

# Start again only when stopped. The private socket directory already exists.
"$EBM_PG_BIN/pg_ctl" -D "$EBM_PG_DATA" -l "$EBM_PG_LOG" -o "-h 127.0.0.1 -p 5432 -k $EBM_PG_SOCKET" -w start
```

`brew services info postgresql@18` reports no registered Homebrew service; `pg_ctl status` reports this manually started process. These are different checks.

## Inspect or validate

```sh
cd "/Users/ayoub/Documents/ayoub/EBM_Website"
"$EBM_PG_BIN/psql" -h "$EBM_PG_SOCKET" -d ebm_auth_test -X --set=ON_ERROR_STOP=1 --command='\dt test_auth.*'
"$EBM_PG_BIN/psql" -h "$EBM_PG_SOCKET" -d ebm_auth_test -X --set=ON_ERROR_STOP=1 --command='\d test_auth.accounts'
"$EBM_PG_BIN/psql" -h "$EBM_PG_SOCKET" -d ebm_auth_test -X --set=ON_ERROR_STOP=1 --file=database/auth-test/validate-rollback.sql
```

Validation passed **14 checks**, including case-insensitive email uniqueness, session token uniqueness/format, campus/name/hash checks, account timestamp updates, session expiry/revocation, foreign key and deletion cascade. Synthetic `.invalid` records were rolled back. Both tables contain **zero rows**. The validation script requires this dedicated database to be empty.

## Original creation commands — already completed

Do not rerun these against the existing database or drop it to resolve an error:

```sh
"$EBM_PG_BIN/createdb" -h "$EBM_PG_SOCKET" --encoding=UTF8 ebm_auth_test
"$EBM_PG_BIN/psql" -h "$EBM_PG_SOCKET" -d ebm_auth_test -X --set=ON_ERROR_STOP=1 --file=database/auth-test/001_accounts_and_sessions.sql
```

The migration is one-time and transactional. Future Node code needs a **server-only** connection string and least-privilege role. Keep credentials out of frontend code, Git and `NEXT_PUBLIC_` variables. Creating this database does not authenticate the form automatically.

See [the API and learning handover](../../docs/AUTH-TEST.md).

References: [Homebrew PostgreSQL](https://formulae.brew.sh/formula/postgresql@18), [createdb](https://www.postgresql.org/docs/current/app-createdb.html), [psql](https://www.postgresql.org/docs/current/app-psql.html).

