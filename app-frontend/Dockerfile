FROM node:14-alpine AS build

WORKDIR /app-frontend

COPY package*.json ./

ENV NODE_ENV=production

RUN npm install

COPY . .

RUN npm run build

COPY dist ./dist

FROM nginx:1.17.1-alpine

COPY --from=build /app-frontend/dist/app-frontend /usr/share/nginx/html

COPY --from=build /app-frontend/nginx.conf /etc/nginx/nginx.conf
