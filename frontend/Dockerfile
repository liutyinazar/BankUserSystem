FROM node:lts-alpine

ENV CHOKIDAR_USEPOLLING=true

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

ENTRYPOINT npm start