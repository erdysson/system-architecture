#! /bin/sh

echo 'Removing Angular Frontend container...'

docker rm angular_app_container_${BUILD_NUMBER}

echo 'Removed Angular Frontend container'
