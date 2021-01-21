FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm run build

COPY dist ./dist

COPY node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
