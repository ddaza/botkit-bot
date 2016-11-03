FROM node:6.9.1

RUN mkdir /app
WORKDIR /app
ADD ./package.json /app/package.json
RUN npm install

CMD npm start
