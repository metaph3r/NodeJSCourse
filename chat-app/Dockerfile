FROM node:12-alpine

COPY ./package*.json ./

RUN npm install --only=prod

COPY ./src ./src
COPY ./public ./public

EXPOSE 3000/tcp

CMD ["npm","start"]