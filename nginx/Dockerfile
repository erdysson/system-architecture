FROM nginx:1.17.1-alpine

COPY private /etc/ssl

COPY certs /etc/ssl/certs

COPY snippets /etc/nginx/snippets

COPY nginx.conf.template /nginx.conf.template

EXPOSE 443

# run nginx with the grabbed container ips
CMD ["/bin/sh" , "-c" , "envsubst '$NEST_APP_CONTAINER_IP $ANGULAR_APP_CONTAINER_IP' < /nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
