# 基于 docker/docker-compose 部署单文件 html

## 功能实现

1. 基于 docker ，分别使用 node 和 nginx 部署 index.html
2. 将静态资源（index.html）与 nginx 配置（nginx.conf）放在本地进行更新和维护，通过 volumes 挂载到容器中

## [我们为什么可以直接在 node 镜像中使用 yarn 命令行工具？](https://hub.docker.com/layers/node/library/node/lts-alpine3.16/images/sha256-9da65f99264be2a78682095c4789b3d8cab12e0012def7d937d7125ed6e7695c?context=explore)

通过查看 node 这个镜像的 layers ，可以看到它下载并解压了 yarn 的安装包，挂载到了 /usr/local/bin/ 目录下，这样就可以直接在 node 镜像中使用 yarn 命令行工具了。

## [Linux /usr/bin 与/usr/local/bin 区别](https://blog.csdn.net/a772304419/article/details/113519250?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-113519250-blog-108269662.pc_relevant_antiscanv4&spm=1001.2101.3001.4242.1&utm_relevant_index=3)

1. /usr/bin 下面的都是系统预装的可执行程序，会随着系统升级而改变
2. /usr/local/bin 目录是给用户放置自己的可执行程序的地方，推荐放在这里，不会被系统升级而覆盖同名文件
3. 多个目录中存在同名可执行程序时，谁优先执行受到 PATH 环境变量顺序的影响
