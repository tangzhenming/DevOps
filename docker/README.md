# Docker

## 常用命令

1.  版本
    1.  docker --version：查看 Docker 版本
    2.  docker version：查看更详细的版本号信息
2.  镜像
    1.  docker images：查看所有镜像
    2.  docker pull node:alpine：拉取一个 node:alpine 的镜像
    3.  docker inspect node:alpine：查看 node:alpine 的镜像信息
    4.  docker build：构建镜像
        1.  `docker build -t node-base:10 .`：-t 指定构建镜像的标签，即镜像名+版本号，`.` 指当前目录
    5.  docker push：推送镜像
3.  容器
    1.  docker run：启动（创建）容器
    2.  docker ps：查看所有容器
    3.  docker stop：停止容器
    4.  docker rm：删除容器
    5.  docker exec -it /bin/bash：进入容器
    6.  docker port：查看容器的端口映射
    7.  docker stats：查看容器资源占用
4.  docker-compose
    1.  docker-compose up：启动项目
        1.  --build：每次启动时都重新构建镜像
        2.  [service name]: 后接 service name ，启动单个或多个 service
    2.  [docker-compose 网络设置之 networks](https://blog.csdn.net/Kiloveyousmile/article/details/79830810)
5.  其他
    1.  docker info：查看 Docker 的配置信息
6.  示例
    1.  `docker run -it --rm nginx:alpine sh`: 启动 nginx:alpine 容器，并进入容器，--rm 参数表示容器退出后自动删除
    2.  `docker run -it --rm -p 3000:80 nginx:alpine`: -p 指定容器的端口映射，3000:80 表示容器的 80 端口映射到宿主机的 3000 端口

## 镜像加速

[Docker 镜像加速-菜鸟教程](https://www.runoob.com/docker/docker-mirror-acceleration.html)
