FROM node:18-alpine

WORKDIR /user/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ENV REACT_APP_SERVER_PORT=4030

RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]