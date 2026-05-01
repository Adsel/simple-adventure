FROM node:22-bookworm

WORKDIR /app

COPY . ./

RUN ls -la
RUN echo "Building server"

EXPOSE 8080 80

CMD npm install && npm run serve
