#! /bin/sh

echo 'Building Angular ${pwd}'

npm install

npm run build --NODE_ENV=production

#docker build -t angular_app -f Dockerfile .
