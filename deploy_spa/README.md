# 基于 docker 部署单页应用，并通过构建缓存与多阶段构建进行优化

## 静态资源服务化

大部分单页应用项目都可以通过 build 命令构建静态资源。

cra 中构建出来的静态资源在 build 目录中，可以通过 `npx serve -s build` 命令在本地跑一个服务器，查看使用静态资源跑起来的效果。

[在 docker 中使用 serve 运行单页应用](https://github.com/tangzhenming/DevOps/blob/main/deploy_spa/cra.Dockerfile)

## 构建优化

1. [利用 docker 的构建缓存，减少构建时间](https://github.com/tangzhenming/DevOps/blob/main/deploy_spa/cra_refactor_time.Dockerfile)
   1. 前端项目构建时间主要消耗在 npm install 和 npm build
   2. ADD/COPY 文件时，指令会检查镜像中是否存在相同的文件并对文件内容进行对比，文件内容的 checksum 没变化时就利用构建缓存来构建镜像
2. [利用 docker 进行多阶段构建，减小构建体积](https://github.com/tangzhenming/DevOps/blob/main/deploy_spa/cra_refactor_size.Dockerfile)
   1. 静态资源完全不需要依赖于 node.js 环境进行服务化，而 node.js 环境将造成极大的资源浪费
   2. 使用 node 镜像对单页应用进行构建，生成静态资源后，再选择体积更小的 nginx 镜像对静态资源进行服务化
