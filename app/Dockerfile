# dev dependencies and compilation stage

FROM node:14 AS DEV

WORKDIR /usr/src/nest_app

COPY package*.json ./

RUN npm install --only=development

COPY . .

CMD ["npm", "run", "build"]

# final code to be containerized

FROM node:14

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/nest_app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=DEV /usr/src/nest_app/dist/* ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
