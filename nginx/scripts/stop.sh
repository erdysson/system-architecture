#! /bin/sh

echo 'Starting Nginx Load balancer container...'

docker stop nginx_lb_container${BUILD_NUMBER}

echo 'Stopped Nginx Load balancer container'
