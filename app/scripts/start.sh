#! /bin/sh

echo 'Starting Nest Backend...'

docker run -d -p 3000:3000 --name="nest_app_container" -it nest_app:latest

echo 'Nest Backend container started on port 3000 with name nest_app_container'
