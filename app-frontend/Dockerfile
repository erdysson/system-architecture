# dev dependencies and compilation stage

FROM node:14 AS BUILD

WORKDIR /usr/src/angular_app

COPY package*.json ./

RUN npm install

COPY . .

ARG NODE_ENV=production

ENV NODE_ENV=$P{NODE_ENV}

CMD ["npm", "run", "build"]

WORKDIR /usr/src/angular_app/dist/app-frontend

# final stage with nginx server

FROM nginx:1.17.1-alpine AS PROD

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=BUILD /usr/src/angular_app/dist/app-frontend /usr/share/nginx/html
