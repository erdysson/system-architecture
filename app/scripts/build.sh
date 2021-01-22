#! /bin/sh

echo 'Build Nest Backend Image'

cd ../

docker build -t nest_app --no-cache -f Dockerfile .
