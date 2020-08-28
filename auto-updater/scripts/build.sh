#!/bin/sh
#Navigates to the folder the script is in
cd "${0%/*}"
echo "Building..."
cd ..
echo "Removing Old Version..."
docker-compose down
echo "Pruning System..."
docker system prune -a
echo "Starting New Version..."
docker-compose up -d 
echo "New Version Started."