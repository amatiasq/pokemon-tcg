#!/bin/sh
set -eu

#######################################
# Used by both ami and docker builds to initialise database schema.
# Env vars:
#   POSTGRES_DB        defaults to postgres
#   POSTGRES_HOST      defaults to localhost
#   POSTGRES_PORT      defaults to 5432
#   POSTGRES_PASSWORD  defaults to ""
#   USE_DBMATE         defaults to ""
# Exit code:
#   0 if migration succeeds, non-zero on error.
#######################################

export PGDATABASE="${POSTGRES_DB:-postgres}"
export PGHOST="${POSTGRES_HOST:-localhost}"
export PGPORT="${POSTGRES_PORT:-5432}"
export PGPASSWORD="${POSTGRES_PASSWORD:-}"

# if args are supplied, simply forward to dbmate
connect="$PGPASSWORD@$PGHOST:$PGPORT/$PGDATABASE?sslmode=disable"

if [ "$#" -ne 0 ]; then
    export DATABASE_URL="${DATABASE_URL:-postgres://supabase_admin:$connect}"
    exec dbmate "$@"
    exit 0
fi

db=$( cd -- "$( dirname -- "$0" )" > /dev/null 2>&1 && pwd )
if [ -z "${USE_DBMATE:-}" ]; then
    for sql in "$db"/user-migrations/*.sql; do
        echo "$0: running $sql"
        psql -v ON_ERROR_STOP=1 --no-password --no-psqlrc -U supabase_admin -f "$sql"
    done
else
    DBMATE_MIGRATIONS_DIR="$db/user-migrations" DATABASE_URL="postgres://supabase_admin:$connect" dbmate --no-dump-schema migrate
fi
