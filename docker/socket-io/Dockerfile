FROM node:14.17

WORKDIR /app

COPY server/. /app

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "socket-io:serve" ]
