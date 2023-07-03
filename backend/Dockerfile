FROM node:19-alpine

WORKDIR /backend

COPY . .

RUN npm install

EXPOSE 5000
EXPOSE 9100

CMD ["npm", "run", "dev"]
