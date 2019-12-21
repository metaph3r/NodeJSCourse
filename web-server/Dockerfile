FROM node:12-alpine

WORKDIR /home/node/web-server

COPY . ./
COPY public ./public
COPY src ./src
COPY templates ./templates

RUN npm i

EXPOSE 3000/tcp

CMD ["node", "./src/app.js"]