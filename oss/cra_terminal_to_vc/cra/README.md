新增 .env 修改环境变量

使用 PUBLIC_URL 配置 CDN 地址

[理解阿里云的 OSS 和配套 CDN，看这一篇就够了](https://blog.csdn.net/qq_31269061/article/details/110633460)
[理解阿里云的 OSS 和配套 CDN，看这一篇就够了](https://blog.m-jay.cn/?p=85)

## 域名备案太麻烦了

备案域名后，开通生成一个 cdn 的域名，把我的应用打包时静态资源分配到 cdn 域名就完事了

后续的静态资源防盗链设置也只是进行黑名单白名单过滤

然后 cdn 缓存做长时间缓存，然后在 oss 设置文件改变时自动通知 cdn 主动触发回源拉取

基本就没有什么了