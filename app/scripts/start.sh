#! /bin/sh

echo 'Starting Nest Backend...'

docker run -d \
           -p 3000:3000 \
           --name="nest_app_container_${BUILD_NUMBER}" \
           -it nest_app:${BUILD_NUMBER}

echo 'Nest Backend container started on port 3000 with name nest_app_container'
