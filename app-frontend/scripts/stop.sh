#! /bin/sh

echo 'Stopping Angular Frontend...'

docker stop -t 10 angular_app_container

echo 'Stopped Angular Frontend container'
