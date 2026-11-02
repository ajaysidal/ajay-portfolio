#!/bin/bash
set -e
set +H

echo '🚀 Starting Deterministic Deployment...'

# 1. Git Operations
echo '📦 Committing changes...'
git add -A
git commit -m "Automated deployment by Silas Agent" || echo 'No changes to commit.'
git push origin main

# 2. Docker Rebuild
echo '🔄 Rebuilding Next.js container (this takes 5-8 minutes)...'
docker compose down
docker compose build --no-cache ajay-portfolio

# 3. Start Services
echo '🟢 Starting all services...'
docker compose up -d

# 4. Health Check
echo '⏳ Waiting 40 seconds for Next.js to initialize...'
sleep 40

echo '🩺 Running Health Check...'
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/)

if [ "$HTTP_CODE" == "200" ] || [ "$HTTP_CODE" == "302" ]; then
    echo "✅ Deployment Successful! (HTTP $HTTP_CODE)"
else
    echo "❌ Deployment Failed! (HTTP $HTTP_CODE)"
    docker compose logs --tail=20 ajay-portfolio
    exit 1
fi
