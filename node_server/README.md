# 实现静态资源服务器

[gogoserver](https://github.com/tangzhenming/gogoserver)

## 功能支持

- [x] 1. 基于 stream 返回数据，并能给出正确的 Content-Length
- [x] 2. 作为一个命令行工具发布
- [x] 3. 通过命令行指定端口号
- [x] 4. 通过命令行读取目录
- [x] 5. 支持 404
- [ ] 6. 支持 trailingSlash
- [ ] 7. 支持 cleanUrls
- [ ] 8. 支持 rewrite
- [ ] 9. 支持 redirect
- [ ] ...

## Q&A

1. 什么是 rewrite 和 redirect？

## 参考资料

1. [serve-handler](https://github.com/vercel/serve-handler)
2. [mini-code](https://github.com/shfshanyue/mini-code/tree/master/code/serve)
