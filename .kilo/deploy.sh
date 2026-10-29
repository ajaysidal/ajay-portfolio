#!/bin/bash
set -e

echo "🚀 Starting deployment to buildwithai.digital..."

# 1. Build production Docker image locally
echo "📦 Building Docker image..."
docker build -t ajay-portfolio:latest .

# 2. Save image to tarball for secure transfer
echo "💾 Saving image for transfer..."
docker save ajay-portfolio:latest -o ajay-portfolio.tar

# 3. Transfer to VPS
echo "📡 Transferring to VPS (157.173.127.188)..."
scp -i ~/.ssh/id_ed25519 ajay-portfolio.tar docker-compose.yml silas@157.173.127.188:~/ajay-portfolio/

# 4. Execute remote deployment
echo "⚙️ Executing remote deployment..."
ssh -i ~/.ssh/id_ed25519 silas@157.173.127.188 << 'EOF'
  cd ~/ajay-portfolio
  
  # Ensure data directory exists for SQLite persistence
  mkdir -p data
  
  # Load the new image and restart services
  docker load -i ajay-portfolio.tar
  docker compose down
  docker compose up -d
  
  # Cleanup
  docker image prune -f
  rm ajay-portfolio.tar
  
  echo "✅ Deployment complete on VPS."
EOF

echo "🎉 Deployment to buildwithai.digital finished successfully."