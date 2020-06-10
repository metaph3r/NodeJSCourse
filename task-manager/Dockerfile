FROM node:12-alpine

COPY ./package*.json ./

RUN npm install --only=prod

COPY ./src ./src
COPY ./.env ./
COPY ./node-course-images ./node-course-images

CMD ["npm", "start"]