FROM node:14-alpine

COPY package*.json ./

CMD ["npm", "install"]

CMD ["npm", "run", "build"]

COPY . .

FROM nginx:1.17.1-alpine AS PROD

COPY --from=0 dist/app-frontend /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
