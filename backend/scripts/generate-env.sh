#!/bin/bash

# Navigate to the parent directory (backend/)
cd "$(dirname "$0")/.." || { echo "❌ Failed to enter backend directory"; exit 1; }

# Create .env.development if it doesn't exist
if [ ! -f .env.development ]; then
  echo -e "NODE_ENV=development\nPORT=3000" > .env.development
  echo "✅ Created .env.development"
else
  echo "ℹ️ .env.development already exists"
fi

# Create .env.production if it doesn't exist
if [ ! -f .env.production ]; then
  echo -e "NODE_ENV=production\nPORT=8080" > .env.production
  echo "✅ Created .env.production"
else
  echo "ℹ️ .env.production already exists"
fi
