FROM node:22-alpine

WORKDIR /app

COPY package*.json /app

RUN npm ci || npm ci

COPY . /app

RUN apk update && apk add bash
RUN chmod +x ./run.sh
