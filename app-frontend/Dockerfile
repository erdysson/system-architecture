FROM node:14.16-alpine AS build

WORKDIR /usr/src/app-frontend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app-frontend/dist/app-frontend /usr/share/nginx/html
