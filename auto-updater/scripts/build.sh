#!/bin/sh
cd "${0%/*}"
echo "Building $BOT_TOKEN"
cd ..
docker-compose kill
docker-compose rm -f
docker-compose build
docker-compose up -d 