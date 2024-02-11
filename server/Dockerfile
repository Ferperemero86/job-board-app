FROM node:21.5.0-alpine

WORKDIR /usr/src/app/server

RUN apk add --no-cache bash

# Install necessary tools (e.g., wget) and download wait-for-it.sh
RUN apk add --no-cache wget \
    && wget -O wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x wait-for-it.sh

COPY ./package*.json ./

COPY . .

RUN npm i

EXPOSE 8000

CMD ["./wait-for-it.sh", "db:5432", "--", "npm", "run", "dev"]
