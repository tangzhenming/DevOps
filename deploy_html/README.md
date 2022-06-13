# 基于 docker/docker-compose 部署单文件 html

## 功能实现

1. 基于 docker ，分别使用 node 和 nginx 部署 index.html
2. 将静态资源（index.html）与 nginx 配置（nginx.conf）放在本地进行更新和维护，通过 Volumn 挂载到容器中

## 常用命令

1.  docker --version：查看 Docker 版本
2.  docker version：查看更详细的版本号信息
3.  docker info：查看 Docker 的配置信息
4.  镜像
    1.  docker pull node:alpine：拉取一个 node:alpine 的镜像
    2.  docker inspect node:alpine：查看 node:alpine 的镜像信息
    3.  docker images：查看所有镜像
    4.  docker build：构建镜像
        1.  `docker build -t node-base:10 .`：-t 指定构建镜像的标签，即镜像名+版本号，`.` 指当前目录
    5.  docker push：推送镜像
5.  容器
    1.  docker run：启动（创建）容器
    2.  docker ps：查看所有容器
    3.  docker stop：停止容器
    4.  docker rm：删除容器
    5.  docker exec -it /bin/bash：进入容器
    6.  docker port：查看容器的端口映射
    7.  docker stats：查看容器资源占用
6.  docker-compose
    1.  docker-compose up：启动项目
        1.  --build：每次启动时都重新构建镜像
7.  示例
    1.  `docker run -it --rm nginx:alpine sh`: 启动 nginx:alpine 容器，并进入容器，--rm 参数表示容器退出后自动删除
    2.  `docker run -it --rm -p 3000:80 nginx:alpine`: -p 指定容器的端口映射，3000:80 表示容器的 80 端口映射到宿主机的 3000 端口

## Q&A

1. 我们为什么可以直接在 node 镜像中使用 yarn 命令行工具？

https://hub.docker.com/layers/node/library/node/lts-alpine3.16/images/sha256-9da65f99264be2a78682095c4789b3d8cab12e0012def7d937d7125ed6e7695c?context=explore
