#! /bin/sh

echo 'Build Angular Frontend Image'

docker build -t angular_app -f Dockerfile .
