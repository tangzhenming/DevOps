FROM node:14-alpine

WORKDIR /code

ADD package.json package-lock.json /code/

RUN npm install

ADD . /code

RUN npm run build

CMD npx serve -s build

EXPOSE 3000