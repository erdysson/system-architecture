#! /bin/sh

BUILD_NUMBER=0

echo 'Starting Angular Frontend...'

docker run -d \
           -p 4200:4200 \
           --name="angular_app_container_${BUILD_NUMBER}" \
           -it angular_app:${BUILD_NUMBER}

echo 'Angular Frontend container started on port 4200 with name angular_app_container'
