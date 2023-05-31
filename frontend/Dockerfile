FROM node:19-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm i @ionic/cli

EXPOSE 8100

RUN ionic serve
