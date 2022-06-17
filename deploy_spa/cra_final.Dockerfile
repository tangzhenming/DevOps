FROM node:14-alpine as builder

WORKDIR /code

ADD package.json package-lock.json /code/
RUN npm install

# 单独分离 public 或 src，是为了避免根目录 ADD . /code 时，因为 Readme 或 nginx.conf 等其他文件的更改导致缓存失效
# 也是为了 npm run build 可最大限度利用缓存
ADD public /code/public
ADD src /code/src
RUN npm run build

# 选择更小体积的基础镜像
FROM nginx:alpine
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder code/build /usr/share/nginx/html