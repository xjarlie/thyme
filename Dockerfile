FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run client-build

RUN npx prisma generate

ENV SERVER_PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]