# dev dependencies and compilation stage

FROM node:14

WORKDIR /usr/src/nest_app

COPY package*.json ./

RUN npm install

COPY . .

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

CMD ["npm", "run", "build"]

CMD ["npm", "run", "start:prod"]
