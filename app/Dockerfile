FROM node:12.7-alpine AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:12.7-alpine

ENV NODE_ENV=production

COPY --from=build /usr/src/app ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
