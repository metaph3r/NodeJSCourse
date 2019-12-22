FROM node:12-alpine

WORKDIR /home/node/weather-app

COPY package*.json ./
COPY public ./public
COPY src ./src
COPY templates ./templates

RUN npm i

EXPOSE 3000/tcp

CMD ["node", "./src/app.js"]