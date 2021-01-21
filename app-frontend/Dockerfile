FROM nginx:1.17.1-alpine AS PROD

CMD ["pwd"]

CMD ["ls"]

COPY dist/app-frontend /usr/share/nginx/html


COPY nginx.conf /etc/nginx/nginx.conf
