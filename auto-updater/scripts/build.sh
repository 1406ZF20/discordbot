#!/bin/sh
cd "${0%/*}"
echo "Building $BOT_TOKEN"
cd ..

docker-compose up -d --build