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

## [Docker 多阶段构建原理和使用场景](https://segmentfault.com/a/1190000016137548)

1. Docker 的镜像是由一堆文件组成的，这些文件是按照层的概念进行划分的
2. Dockerfile 中，大多数指令会生成一个层

   1. code:

   ```Dockerfile
   # 示例一，foo 镜像的Dockerfile
   # 基础镜像中已经存在若干个层了
   FROM ubuntu:16.04

   # RUN指令会增加一层，在这一层中，安装了 git 软件
   RUN apt-get update \
   && apt-get install -y --no-install-recommends git \
   && apt-get clean \
   && rm -rf /var/lib/apt/lists/*
   # 示例二，bar 镜像的Dockerfile
   FROM foo

   # RUN指令会增加一层，在这一层中，安装了 nginx
   RUN apt-get update \
   && apt-get install -y --no-install-recommends nginx \
   && apt-get clean \
   && rm -rf /var/lib/apt/lists/*
   ```

   1. 假设基础镜像 ubuntu:16.04 已经存在 5 层，使用第一个 Dockerfile 打包成镜像 foo，则 foo 有 6 层，又使用第二个 Dockerfile 打包成镜像 bar，则 bar 中有 7 层
   2. 如果 ubuntu:16.04 等其他镜像不算，如果系统中只存在 foo 和 bar 两个镜像，那么系统中一共保存了多少层呢？
   3. 是 7 层，并非 13 层，这是因为，foo 和 bar 共享了 6 层。层的共享机制可以节约大量的磁盘空间和传输带宽，比如你本地已经有了 foo 镜像，又从镜像仓库中拉取 bar 镜像时，只拉取本地所没有的最后一层就可以了，不需要把整个 bar 镜像连根拉一遍，这就是层共享
   4. 层共享的实现：Docker 镜像的每一层只记录文件变更，在容器启动时，Docker 会将镜像的各个层进行计算，最后生成一个文件系统，这个被称为 联合挂载
   5. Docker 的各个层是有相关性的，在联合挂载的过程中，系统需要知道在什么样的基础上再增加新的文件。那么这就要求一个 Docker 镜像只能有一个起始层，只能有一个根。所以，Dockerfile 中，就只允许一个 FROM 指令

3. 所谓的多阶段构建，实际上指的是允许一个 Dockerfile 包含多个 FROM 命令，每个 FROM 命令都会构建一个镜像；我们可以将上一个构建好的镜像的输出作为下一个 FROM 命令的输入
4. Docker 17.05 版本以后允许 Dockerfile 支持多个 FROM 指令，但并不会生成多个根的层关系，最后生成的镜像，仍以最后一条 FROM 为准，之前的 FROM 会被抛弃
5. 每一条 FROM 指令都是一个构建阶段，多条 FROM 就是多阶段构建，虽然最后生成的镜像只能是最后一个阶段的结果，但是，能够将前置阶段中的文件拷贝到后边的阶段中，这就是多阶段构建的最大意义
6. 最大的使用场景是将编译环境和运行环境分离（比如使用 node 构建前端应用生成静态资源后，使用 nginx 将其服务化后运行）

   1. code

      ```Dockerfile
      # 编译阶段
      FROM golang:1.10.3

      COPY server.go /build/

      WORKDIR /build

      RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 GOARM=6 go build -ldflags '-w -s' -o server

      # 运行阶段
      FROM scratch

      # 从编译阶段的中拷贝编译结果到当前镜像中
      COPY --from=0 /build/server /

      ENTRYPOINT ["/server"]
      ```

   2. 这个 Dockerfile 的玄妙之处就在于 COPY 指令的--from=0 参数，从前边的阶段中拷贝文件到当前阶段中，多个 FROM 语句时，0 代表第一个阶段。除了使用数字，我们还可以给阶段命名

      ```Dockerfile
      # 编译阶段 命名为 builder
      FROM golang:1.10.3 as builder

      # ... 省略

      # 运行阶段
      FROM scratch

      # 从编译阶段的中拷贝编译结果到当前镜像中
      COPY --from=builder /build/server /
      ```

   3. 更为强大的是，COPY --from 不但可以从前置阶段中拷贝，还可以直接从一个已经存在的镜像中拷贝。比如

      ```Dockerfile
      FROM ubuntu:16.04

      COPY --from=quay.io/coreos/etcd:v3.3.9 /usr/local/bin/etcd /usr/local/bin/
      ```

      我们直接将 etcd 镜像中的程序拷贝到了我们的镜像中，这样，在生成我们的程序镜像时，就不需要源码编译 etcd 了，直接将官方编译好的程序文件拿过来就行了

      有些程序要么没有 apt 源，要么 apt 源中的版本太老，要么干脆只提供源码需要自己编译，使用这些程序时，我们可以方便地使用已经存在的 Docker 镜像作为我们的基础镜像。但是我们的软件有时候可能需要依赖多个这种文件，我们并不能同时将 nginx 和 etcd 的镜像同时作为我们的基础镜像（不支持多根），这种情况下，使用 COPY --from 就非常方便实用了
