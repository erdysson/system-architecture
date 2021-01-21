FROM node:14-alpine AS build

WORKDIR /app-frontend

COPY package*.json ./

ENV NODE_ENV=production

RUN npm install

COPY . .

RUN npm run --prod

COPY dist ./dist

FROM nginx:1.17.1-alpine

WORKDIR /app-frontend

COPY --from=build dist/app-frontend /usr/share/nginx/html

COPY --from=build nginx.conf /etc/nginx/nginx.conf
