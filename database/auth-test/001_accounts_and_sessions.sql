-- Preparation only: apply once to a dedicated local test database.
-- EBM website test accounts only. No Eduka identities, CMS users or seed data.
BEGIN;

CREATE SCHEMA test_auth;
REVOKE ALL ON SCHEMA test_auth FROM PUBLIC;

CREATE TABLE test_auth.accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL CHECK (char_length(btrim(first_name)) BETWEEN 1 AND 100),
  last_name text NOT NULL CHECK (char_length(btrim(last_name)) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (
    email = btrim(email) AND char_length(email) BETWEEN 3 AND 254
  ),
  campus text NOT NULL CHECK (campus IN ('casablanca', 'rabat')),
  password_hash text NOT NULL CHECK (char_length(password_hash) BETWEEN 32 AND 2048),
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX accounts_email_lower_unique
  ON test_auth.accounts (lower(email));

CREATE FUNCTION test_auth.set_account_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;

CREATE TRIGGER accounts_set_updated_at
  BEFORE UPDATE ON test_auth.accounts
  FOR EACH ROW EXECUTE FUNCTION test_auth.set_account_updated_at();

CREATE TABLE test_auth.sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES test_auth.accounts (id) ON DELETE CASCADE,
  -- SHA-256 hex digest of a high-entropy random session token; never the raw token.
  token_hash text NOT NULL UNIQUE CHECK (token_hash ~ '^[0-9a-f]{64}$'),
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz,
  CONSTRAINT sessions_expiry_after_creation CHECK (expires_at > created_at),
  CONSTRAINT sessions_revocation_after_creation CHECK (
    revoked_at IS NULL OR revoked_at >= created_at
  )
);

CREATE INDEX sessions_account_id_index ON test_auth.sessions (account_id);
CREATE INDEX sessions_expires_at_index ON test_auth.sessions (expires_at);

COMMENT ON SCHEMA test_auth IS
  'Isolated local EBM authentication prototype; not linked to Eduka or Payload CMS users.';
COMMENT ON COLUMN test_auth.accounts.password_hash IS
  'Server-generated password KDF output including algorithm, parameters and salt. Never plaintext.';
COMMENT ON COLUMN test_auth.sessions.token_hash IS
  'SHA-256 hex digest of a random server-issued opaque token. The raw token exists only in its cookie.';

COMMIT;

