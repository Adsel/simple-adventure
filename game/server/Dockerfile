FROM node:20.13.1
ARG serverMode
ENV SERVER_MODE=$serverMode

WORKDIR /app

COPY . ./

RUN ls -la
RUN echo "Building server with mode: "
RUN echo $serverMode

EXPOSE 8080 80

CMD npm install && npm run ${SERVER_MODE}:serve
