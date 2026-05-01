FROM node:20.13.1

WORKDIR /app

COPY . ./

RUN ls -la
RUN echo "Building server with mode: "
RUN echo "socket"

EXPOSE 8080 80

CMD npm install && npm run dev
