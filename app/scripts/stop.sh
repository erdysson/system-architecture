#! /bin/sh

echo 'Stopping Nest Backend...'

docker stop -t 10 nest_app_container

echo 'Stopped Nest Backend container'
