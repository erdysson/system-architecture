#! /bin/sh

BUILD_NUMBER=0

echo 'Removing Nest Backend container...'

docker rm nest_app_container_${BUILD_NUMBER}

echo 'Removed Nest Backend container'
