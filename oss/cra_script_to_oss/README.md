# 使用阿里云 oss 的 jssdk 管理 oss 数据

[阿里云 oss jssdk：ali-oss](https://github.com/ali-sdk/ali-oss)

使用 [p-queue](https://github.com/sindresorhus/p-queue) 实现并发上传

## 静态资源上传优化

- 时间优化：构建后的资源全部上传到对象存储，然而有些资源内容并未发生变更，将会导致过多的上传时间
  - 对于带有 hash 的文件而言，如果存在该文件名，则在 OSS 中存在，则不向 OSS 进行上传操作
  - 对于不带有 hash 的文件而言，可对 header 设置一个 X-OSS-META-MTIME 或者 X-OSS-META-HASH 每次对比来判断该文件是否存在更改,对比 header
- 空间优化：前端每改一行代码，便会生成一个新的资源，而旧资源将会在 OSS 不断堆积，占用额外空间体积，从而导致更多的云服务费用
  - 在生产环境中，OSS 只需保留最后一次线上环境所依赖的资源。(多版本共存情况下除外)，此时可根据 OSS 中所有资源与最后一次构建生成的资源一一对比文件名，进行删除。
