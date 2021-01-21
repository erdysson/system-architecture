#! /bin/sh

echo 'Building Angular'

npm install

npm run build --NODE_ENV=production

docker build -t angular_app -f Dockerfile .
