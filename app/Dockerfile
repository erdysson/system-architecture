# dev dependencies and compilation stage

FROM node:14 As dev

WORKDIR /usr/src/nest_app

COPY package*.json ./

RUN npm install --only=development

COPY . .

CMD ["npm", "run", "build"]

# final code to be containerized

FROM node:14 As prod

ARG NODE_ENV=production

ENV NODE_ENV=$P{NODE_ENV}

WORKDIR /usr/src/nest_app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=dev /usr/src/nest_app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
