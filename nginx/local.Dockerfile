FROM nginx:latest

COPY etc /etc/

COPY nginx.local.conf /etc/nginx/nginx.conf
