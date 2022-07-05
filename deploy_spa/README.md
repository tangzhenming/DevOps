# 基于 docker 部署单页应用

## 静态资源服务化

大部分单页应用项目都是通过 `npm run build` 命令构建静态资源。

cra 中构建出来的静态资源在 build 目录中，可以通过 `npx serve -s`（-s, --single Rewrite all not-found requests to `index.html`） 命令在本地跑一个服务器，查看使用静态资源跑起来的效果。

[在 docker 中使用 serve 运行单页应用](https://github.com/tangzhenming/DevOps/blob/main/deploy_spa/cra.Dockerfile)

## 通过构建缓存与多阶段构建进行优化

1. [利用 docker 的构建缓存，减少构建时间](https://github.com/tangzhenming/DevOps/blob/main/deploy_spa/cra_refactor_time.Dockerfile)
2. [利用 docker 进行多阶段构建，减小构建体积](https://github.com/tangzhenming/DevOps/blob/main/deploy_spa/cra_refactor_size.Dockerfile)
   1. 静态资源完全不需要依赖于 node.js 环境进行服务化，而且 node.js 环境会造成极大的资源浪费
   2. 利用 docker 的多阶段构建机制，我们使用 node 镜像对单页应用进行构建，生成静态资源后，再选择体积更小的 nginx 镜像对静态资源进行服务化

## [单页应用的客户端路由处理及长期缓存优化](https://github.com/tangzhenming/DevOps/tree/main/deploy_spa/cra_final.Dockerfile)
