FROM node:21-alpine

WORKDIR /usr/cyberBank

COPY package.json .
RUN npm install

COPY . .

RUN npm run build