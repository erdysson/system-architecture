#! /bin/sh

echo 'Starting Nginx...'

NEST_APP_CONTAINER_IP=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' nest_app_container_${BUILD_NUMBER})
ANGULAR_APP_CONTAINER_IP=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' angular_app_container_${BUILD_NUMBER})

echo "nest container ip : $NEST_APP_CONTAINER_IP"
echo "angular container ip : $ANGULAR_APP_CONTAINER_IP"

docker run -d \
           -p 443:443 \
           -e NEST_APP_CONTAINER_IP="$NEST_APP_CONTAINER_IP" \
           -e ANGULAR_APP_CONTAINER_IP="$ANGULAR_APP_CONTAINER_IP" \
           --name="nginx_lb_container_${BUILD_NUMBER}" \
           -it nginx_lb:${BUILD_NUMBER}

echo 'Started Nginx'
