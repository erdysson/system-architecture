#! /bin/sh

echo 'Starting Cypress Test container...'

npm install --only=development

NGINX_LB_CONTAINER_IP=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' nginx_lb_container_${BUILD_NUMBER})

docker run -v $PWD:/e2e \
           -w /e2e \
           --name="cypress_test_container_${BUILD_NUMBER}" \
           cypress/included:6.3.0 \
           --browser chrome \
           --config baseUrl="https://${NGINX_LB_CONTAINER_IP}"

echo 'Started Cypress Test container'
