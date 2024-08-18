#!/bin/bash

# Navigate to your application directory
cd /home/trouys16/Jobby

# Pull the latest code
git pull origin main

# Install dependencies
pnpm i

# Kill processes running on port 3000 (API) and 5173 (web app)
fuser -k 3000/tcp || true
fuser -k 5173/tcp || true

# Optionally wait a few seconds to ensure processes are killed
sleep 5

# Start the application
pnpm run start