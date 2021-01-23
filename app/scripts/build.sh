#! /bin/sh

echo 'Build Nest Backend Image'

docker build -t nest_app:${BUILD_NUMBER} \
             --no-cache \
             -f Dockerfile .
