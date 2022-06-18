# 将静态资源部署到 OSS/CDN

[阿里云 oss 控制台](https://oss.console.aliyun.com/overview)

## [使用 ossutil 以命令行的方式管理 oss 数据](https://help.aliyun.com/document_detail/50451.html)

```shell
# 将资源上传到 OSS Bucket
# --meta: 配置响应头，也就是这里的缓存策略
# oss://tang-cra/: bucket 名字
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