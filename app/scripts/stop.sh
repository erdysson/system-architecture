#! /bin/sh

echo 'Stopping Nest Backend...'

docker stop nest_app_container_${BUILD_NUMBER}

echo 'Stopped Nest Backend container'
