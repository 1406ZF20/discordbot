#!/bin/sh
cd "${0%/*}"
echo "Building $BOT_TOKEN"
cd ..
echo "Removing Old Version..."
docker-compose down
echo "Starting New Version..."
docker-compose up -d --no-deps --build
echo "New Version Started."
