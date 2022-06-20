# 将静态资源部署到 OSS/CDN

[阿里云 oss 控制台](https://oss.console.aliyun.com/overview)

- [使用 ossutil 上传至 oss](https://github.com/tangzhenming/DevOps/tree/main/oss/cra_ossutil_to_oss)
- [使用脚本集成 ali-oss/p-queque ，控制静态资源上传至 oss](https://github.com/tangzhenming/DevOps/tree/main/oss/cra_script_to_oss)
- [额外：使用 vercel 部署项目](https://github.com/tangzhenming/DevOps/tree/main/oss/cra_terminal_to_vc)
-

## [Mac 环境变量配置](https://www.jianshu.com/p/2af08672f55c)

[usr/bin 以及 usr/local/bin](https://www.jianshu.com/p/c74d1446da7c)

## 禁用 docker 构建缓存

在 oss 控制台删除了静态资源后，本地再 build docker 镜像时会发现镜像都命中了缓存，所以不会触发 oss 的上传脚本命令，使用 `docker-compose build --no-cache oss` 重新 build 一次即可。
