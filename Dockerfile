FROM node:21.5.0-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm i

COPY . .

EXPOSE 5173

CMD  npm run dev
