# 基于 docker/docker-compose 部署单文件 html

## 功能实现

1. 基于 docker ，分别使用 node 和 nginx 部署 index.html
2. 将静态资源（index.html）与 nginx 配置（nginx.conf）放在本地进行更新和维护，通过 volumes 挂载到容器中
