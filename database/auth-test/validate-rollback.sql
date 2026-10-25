\set ON_ERROR_STOP on
BEGIN;

DO $$
DECLARE
  test_account uuid;
  test_session uuid;
  updated_value timestamptz;
  passed integer := 0;
BEGIN
  IF current_database() <> 'ebm_auth_test' THEN
    RAISE EXCEPTION 'Run this validation only against ebm_auth_test';
  END IF;
  IF EXISTS (SELECT 1 FROM test_auth.accounts)
     OR EXISTS (SELECT 1 FROM test_auth.sessions) THEN
    RAISE EXCEPTION 'Validation expects an empty test database';
  END IF;

  INSERT INTO test_auth.accounts
    (first_name, last_name, email, campus, password_hash, created_at, updated_at)
  VALUES
    ('Schema', 'Test', 'schema-check@example.invalid', 'casablanca', repeat('x', 64),
     CURRENT_TIMESTAMP - interval '1 day', CURRENT_TIMESTAMP - interval '1 day')
  RETURNING id INTO test_account;
  passed := passed + 1;

  BEGIN
    INSERT INTO test_auth.accounts (first_name,last_name,email,campus,password_hash)
    VALUES ('Duplicate','Test','SCHEMA-CHECK@example.invalid','rabat',repeat('x',64));
    RAISE EXCEPTION 'case-insensitive email uniqueness did not reject duplicate';
  EXCEPTION WHEN unique_violation THEN passed := passed + 1;
  END;

  BEGIN
    INSERT INTO test_auth.accounts (first_name,last_name,email,campus,password_hash)
    VALUES ('Invalid','Campus','invalid-campus@example.invalid','other',repeat('x',64));
    RAISE EXCEPTION 'campus constraint did not reject invalid value';
  EXCEPTION WHEN check_violation THEN passed := passed + 1;
  END;

  BEGIN
    INSERT INTO test_auth.accounts (first_name,last_name,email,campus,password_hash)
    VALUES ('  ','Invalid','invalid-name@example.invalid','rabat',repeat('x',64));
    RAISE EXCEPTION 'name constraint did not reject blank name';
  EXCEPTION WHEN check_violation THEN passed := passed + 1;
  END;

  BEGIN
    INSERT INTO test_auth.accounts (first_name,last_name,email,campus,password_hash)
    VALUES ('Invalid','Hash','invalid-hash@example.invalid','rabat','short');
    RAISE EXCEPTION 'hash constraint did not reject short value';
  EXCEPTION WHEN check_violation THEN passed := passed + 1;
  END;

  UPDATE test_auth.accounts SET first_name = 'Updated' WHERE id = test_account
    RETURNING updated_at INTO updated_value;
  IF updated_value <= CURRENT_TIMESTAMP - interval '1 day' THEN
    RAISE EXCEPTION 'updated_at trigger did not advance timestamp';
  END IF;
  passed := passed + 1;

  INSERT INTO test_auth.sessions (account_id,token_hash,expires_at)
  VALUES (test_account,repeat('a',64),CURRENT_TIMESTAMP + interval '1 hour')
  RETURNING id INTO test_session;
  passed := passed + 1;

  BEGIN
    INSERT INTO test_auth.sessions (account_id,token_hash,expires_at)
    VALUES (test_account,repeat('a',64),CURRENT_TIMESTAMP + interval '1 hour');
    RAISE EXCEPTION 'session token uniqueness did not reject duplicate';
  EXCEPTION WHEN unique_violation THEN passed := passed + 1;
  END;

  BEGIN
    INSERT INTO test_auth.sessions (account_id,token_hash,expires_at)
    VALUES (test_account,'not-a-hash',CURRENT_TIMESTAMP + interval '1 hour');
    RAISE EXCEPTION 'token hash format constraint did not reject malformed hash';
  EXCEPTION WHEN check_violation THEN passed := passed + 1;
  END;

  BEGIN
    INSERT INTO test_auth.sessions (account_id,token_hash,expires_at)
    VALUES (test_account,repeat('b',64),CURRENT_TIMESTAMP - interval '1 second');
    RAISE EXCEPTION 'expiry constraint did not reject expired-at-creation session';
  EXCEPTION WHEN check_violation THEN passed := passed + 1;
  END;

  BEGIN
    INSERT INTO test_auth.sessions (account_id,token_hash,expires_at,revoked_at)
    VALUES (test_account,repeat('b',64),CURRENT_TIMESTAMP + interval '1 hour',
            CURRENT_TIMESTAMP - interval '1 second');
    RAISE EXCEPTION 'revocation constraint did not reject date before creation';
  EXCEPTION WHEN check_violation THEN passed := passed + 1;
  END;

  BEGIN
    INSERT INTO test_auth.sessions (account_id,token_hash,expires_at)
    VALUES (gen_random_uuid(),repeat('c',64),CURRENT_TIMESTAMP + interval '1 hour');
    RAISE EXCEPTION 'foreign key did not reject nonexistent account';
  EXCEPTION WHEN foreign_key_violation THEN passed := passed + 1;
  END;

  UPDATE test_auth.sessions SET revoked_at = CURRENT_TIMESTAMP WHERE id = test_session;
  IF NOT EXISTS (SELECT 1 FROM test_auth.sessions WHERE id = test_session AND revoked_at IS NOT NULL) THEN
    RAISE EXCEPTION 'session revocation update failed';
  END IF;
  passed := passed + 1;

  DELETE FROM test_auth.accounts WHERE id = test_account;
  IF EXISTS (SELECT 1 FROM test_auth.sessions WHERE id = test_session) THEN
    RAISE EXCEPTION 'account deletion did not cascade to its session';
  END IF;
  passed := passed + 1;

  RAISE NOTICE 'PASS: % isolated schema checks; transaction will roll back', passed;
END;
$$;

ROLLBACK;

SELECT 'accounts' AS table_name, count(*) AS residual_rows FROM test_auth.accounts
UNION ALL
SELECT 'sessions', count(*) FROM test_auth.sessions;
