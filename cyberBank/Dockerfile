FROM node:22-alpine

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci || npm ci

COPY . /app

RUN npm run build