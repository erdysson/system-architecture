#! /bin/sh

echo 'Stopping Angular Frontend...'

docker stop angular_app_container_${BUILD_NUMBER}

echo 'Stopped Angular Frontend container'
