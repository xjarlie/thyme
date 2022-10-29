FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN cd client && npm install
RUN cd server && npm install

RUN cd client && npm run build

EXPOSE 3000 4000

CMD ["npm", "run", "prodstart"]