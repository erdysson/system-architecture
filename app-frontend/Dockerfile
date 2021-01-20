# dev dependencies and compilation stage

FROM node:14 AS DEV

WORKDIR /usr/src/angular_app_dev

COPY package*.json ./

RUN npm install --only=development

COPY . .

CMD ["npm", "run", "build"]

# angular final assets stage

FROM node:14 AS BUILD

ARG NODE_ENV=production

ENV NODE_ENV=$P{NODE_ENV}

WORKDIR /usr/src/angular_app_build

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=DEV /usr/src/angular_app_dev/dist ./dist

# final stage with nginx server

FROM nginx:1.17.1-alpine AS PROD

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=BUILD /usr/src/angular_app_build/dist/app-frontend /usr/share/nginx/html
