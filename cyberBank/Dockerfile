FROM node:22-alpine AS development

WORKDIR /app

COPY package*.json /app

RUN npm ci || npm ci

COPY . /app

RUN apk update && apk add bash
RUN chmod +x ./run.sh


FROM development AS build

RUN npm run build
RUN npm run copy-files