FROM node:12-alpine
WORKDIR /usr/src/app
RUN node -v
RUN npm -v
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories
RUN apk update
RUN apk add mongodb
RUN mongo --help
#State what to copy
COPY package.json .
COPY webpack.config.js .
COPY server server
COPY src src

#Install everything and boot
RUN npm install
RUN npm run build

EXPOSE 3000

CMD npm run serve