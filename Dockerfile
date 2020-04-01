FROM node:13-alpine

WORKDIR /cobot
COPY . /cobot

ENV PORT=3892

RUN npm install && npm run build

ENTRYPOINT [ "node", "." ]
