FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

CMD ["npm", "install"]

CMD ["npm", "run", "build"]

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
