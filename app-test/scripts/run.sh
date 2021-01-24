#! /bin/sh

echo 'Starting Cypress container'

npm install --only=development

docker run -v $PWD:/e2e \
           -w /e2e \
           cypress/included:6.3.0 \
           --browser chrome
