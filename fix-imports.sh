#!/bin/bash
for file in app/manager/page.js app/resident/page.js; do
  sed -i '' "s|await import('.*lib/supabase')|await import('../lib/supabase.js')|g" "$file"
done
