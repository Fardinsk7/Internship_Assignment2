FROM node:20.15.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ecdsa.key /app/ecdsa.key

EXPOSE 7000

CMD [ "npm","start" ]