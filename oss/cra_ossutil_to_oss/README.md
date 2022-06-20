# [使用 ossutil 以命令行的方式管理 oss 数据](https://help.aliyun.com/document_detail/50451.html)

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

## 加强版的 ossutil

[rclone](https://rclone.org/)

[rclone - github](https://github.com/rclone/rclone)

Rclone (opens new window)，rsync for cloud storage，是使用 Go 语言编写的一款高性能云文件同步的命令行工具，可理解为云存储版本的 rsync，或者更高级的 ossutil。

它支持以下功能:

1. 按需复制，每次仅仅复制更改的文件
2. 断点续传
3. 压缩传输

选择阿里云 oss 作为云存储时，配置时其 type 为 s3，其 provider 为 Alibaba

```sh
# 将资源上传到 OSS Bucket
# alibabaoss: 通过 rclone 配置的云存储名称，此处为阿里云的 oss，个人取名为 alibabaoss
# tang-cra: oss 中的 bucket 名称
$ rclone copy --exclude 'static/**' --header 'Cache-Control: no-cache' build alibabaoss:/tang-cra --progress

# 将带有 hash 资源上传到 OSS Bucket，并且配置长期缓存
$ rclone copy --header  'Cache-Control: max-age=31536000' build/static alibabaoss:/tang-cra/static --progress
```

使用 npm script 维护上传命令：

```json
{
  "scripts": {
    "oss:rclone": "rclone copy --exclude 'static/**' --header 'Cache-Control: no-cache' build alibabaoss:/tang-cra --progress && rclone copy --header  'Cache-Control: max-age=31536000' build/static alibabaoss:/tang-cra/static --progress"
  }
}
```

[常用 rclone 命令](https://blog.csdn.net/jiujiederoushan/article/details/125217259)
