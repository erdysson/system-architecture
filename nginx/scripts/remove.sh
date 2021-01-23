#! /bin/sh

echo 'Removing Nginx Load balancer container...'

docker rm nginx_lb_container_${BUILD_NUMBER}

echo 'Removed Nginx Load balancer container'
