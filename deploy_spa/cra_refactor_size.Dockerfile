FROM node:14-alpine as builder

WORKDIR /code

ADD package.json package-lock.json /code/

RUN npm install

ADD . /code

RUN npm run build

# 选择更小体积的基础镜像
FROM nginx:alpine
COPY --from=builder code/build /usr/share/nginx/html