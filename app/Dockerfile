FROM node:14.16-alpine AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14.16-alpine

ENV NODE_ENV=docker

COPY --from=build /usr/src/app ./

COPY env env

CMD ["npm", "run", "start:prod"]
