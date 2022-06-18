# 将静态资源部署到 OSS/CDN

[阿里云 oss 控制台](https://oss.console.aliyun.com/overview)

## [使用 ossutil 以命令行的方式管理 oss 数据](https://help.aliyun.com/document_detail/50451.html)

```shell
# 将资源 build 上传到 OSS Bucket tang-cra 中
# oss://tang-cra/: bucket 名字
# cp 复制
# -r: 递归
# -f: 强制覆盖
# -m/--meta: 配置响应头，也就是这里的缓存策略
$ ossutil cp -rf --meta Cache-Control:no-cache build oss://tang-cra/

# 将带有 hash 资源上传到 OSS Bucket，并且配置长期缓存
# 注意此时 build/static 上传了两遍 (上一遍的上传中包含了 static ，可通过脚本进行优化)
$ ossutil cp -rf --meta Cache-Control:max-age=31536000 build/static oss://tang-cra/static
```

使用 npm script 维护上传命令：

```json
{
  "scripts": {
    "oss:cli": "ossutil cp -rf --meta Cache-Control:no-cache build oss://tang-cra/ && ossutil cp -rf --meta Cache-Control:max-age=31536000 build/static oss://tang-cra/static"
  }
}
```

## 使用阿里云 oss 的 jssdk 管理 oss 数据

[阿里云 oss jssdk：ali-oss](https://github.com/ali-sdk/ali-oss)

使用 [p-queue](https://github.com/sindresorhus/p-queue) 实现并发上传

## [使用脚本集成 ossutil/ali-oss/p-queque ，控制静态资源上传至 oss](https://github.com/tangzhenming/DevOps/tree/main/oss/cra_script_to_oss)

## [Mac 环境变量配置](https://www.jianshu.com/p/2af08672f55c)

## 在 oss 控制台删除了静态资源后，本地再 build docker 镜像时会发现镜像都命中了缓存，所以不会触发 oss 的上传脚本命令，使用 `docker-compose build --no-cache oss` 重新 build 一次即可。
