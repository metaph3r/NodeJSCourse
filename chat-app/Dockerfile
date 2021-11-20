FROM node:16.13.0-alpine3.14

WORKDIR /home/chat-app

COPY ./package*.json ./
RUN npm install --only=prod

COPY ./public ./public
COPY ./src ./src

EXPOSE 3000/tcp

CMD ["npm","start"]