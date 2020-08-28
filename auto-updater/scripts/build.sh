#!/bin/sh
cd "${0%/*}"
echo "Building $BOT_TOKEN"
cd ..

docker-compose build
docker-compose up -d