FROM node:14-alpine

COPY package*.json ./

COPY dist ./dist

COPY app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
