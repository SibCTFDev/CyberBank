FROM node:18-alpine

# Установка зависимостей, нужных для Jimp (или если вдруг canvas останется)
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    && mkdir -p /app

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "picturetest.js"]