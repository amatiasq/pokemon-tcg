#!/bin/bash

export $(head -n30 .env | grep -v '^#' | xargs)

npx supabase db \
  --db-url "postgresql://postgres:$POSTGRES_PASSWORD@localhost:$POSTGRES_PORT/$POSTGRES_DB" \
  diff \
  | grep -v '^grant' \
  | perl -0777 -pe 's/\n{2,}/\n\n/g' \
  > supabase/migrations/$(date "+%Y%m%d%H%M%S")_auto.sql
