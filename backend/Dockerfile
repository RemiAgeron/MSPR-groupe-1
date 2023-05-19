FROM node:19-alpine

WORKDIR /app

COPY . .

RUN npm install

# RUN npx prisma generate
# RUN npx prisma migrate dev

EXPOSE 5000

CMD ["npm", "run", "dev"]
