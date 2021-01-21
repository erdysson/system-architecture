FROM node:14-alpine

COPY package*.json ./

CMD ["npm", "install"]

CMD ["npm", "run", "build"]

COPY dist ./dist

FROM nginx:1.17.1-alpine AS PROD

RUN echo "working dir is : $PWD"

COPY --from=0 dist/app-frontend /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
