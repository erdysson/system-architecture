#! /bin/sh

echo 'Building Nest'

npm install --only=development

npm run build

rm -rf node_modules

npm install --only=production

#docker build -t nest_app -f Dockerfile .
