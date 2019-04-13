FROM node:11

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY dist/server ./

EXPOSE 5001

ENV NODE_ENV=production

CMD [ "node", "server.js" ]
