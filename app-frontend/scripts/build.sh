#! /bin/sh

echo 'Build Angular Frontend Image'

docker build -t angular_app:${BUILD_NUMBER} \
             --no-cache \
             -f Dockerfile .
