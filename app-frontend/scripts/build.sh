#! /bin/sh

BUILD_NUMBER=0

echo 'Build Angular Frontend Image'

docker build -t angular_app:${BUILD_NUMBER} \
             --no-cache \
             -f Dockerfile .
