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

## [Docker 多阶段构建原理和使用场景](https://github.com/tangzhenming/DevOps/issues/1)

## Dockerfile 中 CMD 与 RUN 有什么区别？

RUN 在构建阶段执行，每执行一次会为镜像添加一个层，而 CMD 只在容器启动时执行（而且还不一定执行，它只是容器启动时默认的执行命令）。

CMD 指令可以使用 shell 和 exec 参数的格式；在使用 shell 时，实际命令也会被包装为 exec 格式。

[CMD 命令详解](https://yeasy.gitbook.io/docker_practice/image/dockerfile/cmd)

## 静态资源优化

1. 使用 terser 压缩 Javascript 资源
2. 使用 cssnano 压缩 CSS 资源
3. 使用 sharp/CDN 压缩 Image 资源或转化为 Webp
4. 使用 webpack 将小图片转化为 DataURI
5. 使用 webpack 进行更精细的分包，避免一行代码的改动使大量文件的缓存失效

## Dockerfile 中 COPY 指令与 ADD 指令

[COPY 复制文件](https://yeasy.gitbook.io/docker_practice/image/dockerfile/copy)

COPY 指令将从构建上下文目录中 <源路径> 的文件或者目录，复制到新的一层的镜像内的 <目标路径> 位置。

[ADD 更高级的复制文件](https://yeasy.gitbook.io/docker_practice/image/dockerfile/add)

ADD 指令和 COPY 的格式和性质基本一致。但是在 COPY 基础上增加了一些功能。

1. <源路径> 可以是一个 URL，这种情况下，Docker 引擎会试图去下载这个链接的文件放到 <目标路径> 去。
2. <源路径> 为一个 tar 压缩文件的话，ADD 指令将会自动解压缩这个压缩文件到 <目标路径> 去。

最佳实践：尽可能使用 COPY ，除非需要自动解压缩。
