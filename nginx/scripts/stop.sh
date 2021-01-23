#! /bin/sh

echo 'Starting Nginx Load balancer container...'

docker stop nginx_lb_container_${BUILD_NUMBER}

echo 'Stopped Nginx Load balancer container'
