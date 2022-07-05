# Development Operations

## Catalog 📚

- [Docker 相关](https://github.com/tangzhenming/DevOps/tree/main/docker)
- [实现静态资源服务器](https://github.com/tangzhenming/DevOps/tree/main/node_server)
- [基于 docker/docker-compose 部署单文件 html](https://github.com/tangzhenming/DevOps/tree/main/deploy_html)
- [基于 docker 学习 nginx 配置](https://github.com/tangzhenming/DevOps/tree/main/nginx_config)
- [单页部署——基于 docker 部署单页应用](https://github.com/tangzhenming/DevOps/tree/main/deploy_spa)
- [对象存储——将静态资源部署到 OSS/CDN](https://github.com/tangzhenming/DevOps/tree/main/oss)
- [服务网关——traefik 搭建](https://github.com/tangzhenming/DevOps/tree/main/traefik)
- [持续集成、持续部署/交付——CICD](https://github.com/tangzhenming/DevOps/tree/main/ci_cd)
- ...

## 思考 🤔

1. [rewrite 和 redirect 的区别](https://github.com/tangzhenming/DevOps/issues/3)
2. [301 302 303 304 的区别](https://github.com/tangzhenming/DevOps/issues/4)
3. [我们为什么可以直接在 node 镜像中使用 yarn 命令行工具？](https://github.com/tangzhenming/DevOps/issues/5)
4. [Linux /usr/bin 与/usr/local/bin 区别](https://github.com/tangzhenming/DevOps/issues/6)
5. [Docker 多阶段构建原理和使用场景](https://github.com/tangzhenming/DevOps/issues/1)
6. [Dockerfile 中 CMD 与 RUN 有什么区别？](https://github.com/tangzhenming/DevOps/issues/7)
7. [静态资源优化手段](https://github.com/tangzhenming/DevOps/issues/8)
8. [Dockerfile 中 COPY 指令与 ADD 指令](https://github.com/tangzhenming/DevOps/issues/9)
9. [Mac 环境变量配置](https://github.com/tangzhenming/DevOps/issues/10)
10. [traefik 解决了什么问题](https://github.com/tangzhenming/DevOps/issues/11)
11. [traefik dashboard 访问控制](https://github.com/tangzhenming/DevOps/issues/12)

## Reference

[前端部署十五篇](https://q.shanyue.tech/deploy/)

[Docker —— 从入门到实践](https://yeasy.gitbook.io/docker_practice/)

## 未分类/未完成 知识点

[在 docker-compose 中容器可以直接过 service name 直接访问其他容器服务，这个过程中是如何实现 dns 解析的？]()

# 在 docker-compose 中容器可以直接过 service name 直接访问其他容器服务，这个过程中是如何实现 dns 解析的？

## 前置知识

Linux 命令：

1. ifconfig: Linux 中用于显示或配置网卡的命令，可显示当前的网卡设置，或设置网络设备的状态（网卡重启后设置失效，如果需要永久生效，需要修改网卡的配置文件）。
