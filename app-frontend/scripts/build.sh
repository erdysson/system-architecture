#! /bin/sh

echo 'Build Angular Frontend Image'

cd ../

docker build -t angular_app --no-cache -f Dockerfile .
