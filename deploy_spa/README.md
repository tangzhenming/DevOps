# 基于 docker 部署单页应用，并通过构建缓存与多阶段构建进行优化

## 静态资源服务化

大部分单页应用项目都可以通过 build 命令构建静态资源。

cra 中构建出来的静态资源在 build 目录中，可以通过 `npx serve -s build` 命令在本地跑一个服务器，查看使用静态资源跑起来的效果。

[在 docker 中使用 serve 运行单页应用](https://github.com/tangzhenming/DevOps/blob/main/deploy_spa/cra.Dockerfile)
