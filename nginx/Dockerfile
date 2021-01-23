FROM nginx:1.17.1-alpine

COPY private /etc/ssl

COPY certs /etc/ssl/certs

COPY snippets /etc/nginx/snippets

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 443
