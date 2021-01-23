echo 'Starting Nginx...'

NEST_APP_CONTAINER_IP=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' nest_app_container_114)
ANGULAR_APP_CONTAINER_IP=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' angular_app_container_114)

echo "nest container ip : $NEST_APP_CONTAINER_IP"
echo "angular container ip : $ANGULAR_APP_CONTAINER_IP"

docker run -d \
           -p 443:443 \
           -e NEST_APP_CONTAINER_IP="$NEST_APP_CONTAINER_IP" \
           -e ANGULAR_APP_CONTAINER_IP="$ANGULAR_APP_CONTAINER_IP" \
           --name="sys_arch_nginx_container" \
           -it sys_arch_nginx

echo 'Started Nginx'
