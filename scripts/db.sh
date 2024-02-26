#!/bin/bash

export $(head -n30 .env | grep -v '^#' | xargs)

# echo "postgresql://postgres:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB"

npx supabase db \
  --db-url "postgresql://postgres:$POSTGRES_PASSWORD@localhost:$POSTGRES_PORT/$POSTGRES_DB" \
  "$@"
