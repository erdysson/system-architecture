FROM node:14.16-alpine AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14.16-alpine

ENV NODE_ENV=production

COPY --from=build /usr/src/app ./

CMD ["npm", "run", "start:prod"]
