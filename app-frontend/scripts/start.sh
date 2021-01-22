#! /bin/sh

echo 'Starting Angular Frontend...'

docker run -d -p 4200:8000 --name="angular_app_container" -it angular_app:latest

echo 'Angular Frontend container started on port 4200 with name angular_app_container'
