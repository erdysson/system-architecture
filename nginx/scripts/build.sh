#! /bin/sh

echo 'Building Nginx...'

docker build -t nginx_lb:${BUILD_NUMBER} \
       --no-cache \
       -f Dockerfile .
