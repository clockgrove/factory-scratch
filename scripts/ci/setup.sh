#!/usr/bin/env bash
# Heavy setup for the scratch adopter: PostgreSQL with pgvector built from source, a role and a
# database, and DATABASE_URL exported for every later step. Takes minutes on a cold runner on
# purpose: it is the setup cost a sandbox image would remove.
set -euo pipefail
PGVECTOR_VERSION="${PGVECTOR_VERSION:-v0.8.1}"
if command -v pg_config >/dev/null 2>&1; then
  sudo apt-get update -qq
  sudo apt-get install -y -qq "postgresql-server-dev-$(pg_config --version | sed -E 's/PostgreSQL ([0-9]+).*/\1/')" build-essential git >/dev/null
else
  sudo apt-get update -qq && sudo apt-get install -y -qq postgresql postgresql-server-dev-all build-essential git >/dev/null
fi
sudo systemctl start postgresql || sudo service postgresql start
tmp="$(mktemp -d)"
git clone -q --depth 1 --branch "$PGVECTOR_VERSION" https://github.com/pgvector/pgvector.git "$tmp/pgvector"
make -s -C "$tmp/pgvector" with_llvm=no >/dev/null
sudo make -s -C "$tmp/pgvector" install with_llvm=no >/dev/null
sudo -u postgres psql -v ON_ERROR_STOP=1 -q <<'SQL'
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'factory') THEN CREATE ROLE factory LOGIN PASSWORD 'factory' SUPERUSER; END IF; END $$;
SQL
sudo -u postgres psql -q -tc "SELECT 1 FROM pg_database WHERE datname = 'factory'" | grep -q 1 || sudo -u postgres createdb -O factory factory
export DATABASE_URL="postgres://factory:factory@localhost:5432/factory"
if [ -n "${GITHUB_ENV:-}" ]; then echo "DATABASE_URL=$DATABASE_URL" >> "$GITHUB_ENV"; fi
echo "setup: postgres ready at $DATABASE_URL with pgvector $PGVECTOR_VERSION"
