# dev dependencies and compilation stage

FROM node:14 AS DEV

WORKDIR /usr/src/nest_app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# final code to be containerized

FROM node:14 as PROD

ARG NODE_ENV=production

ENV NODE_ENV=$P{NODE_ENV}

WORKDIR /usr/src/nest_app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=DEV /usr/src/nest_app/dist ./dist

CMD ["npm", "run", "start:prod"]
