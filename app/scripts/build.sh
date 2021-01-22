#! /bin/sh

echo 'Build Nest Backend Image'

docker build -t nest_app --no-cache -f Dockerfile .
