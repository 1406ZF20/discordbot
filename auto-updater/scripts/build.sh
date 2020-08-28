#!/bin/sh
#Navigates to the folder the script is in
cd "${0%/*}"
echo "Building..."
cd ..
echo "Removing Old Version..."
docker-compose down
echo "Starting New Version..."
docker-compose up -d --no-deps --build  > /dev/null 2&>1 
echo "New Version Started."
