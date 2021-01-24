#! /bin/sh

echo 'Starting Cypress container'

docker run -v $PWD:/e2e \
           -w /e2e \
           cypress/included:6.3.0 \
           --parallel \
           --browser chrome
