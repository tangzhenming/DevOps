# 实现静态资源服务器

[gogoserver](https://github.com/tangzhenming/gogoserver)

## [rewrite 和 redirect 的区别](https://blog.csdn.net/weixin_33755847/article/details/93204614)

- rewrite 是服务器端的重定向，服务端中不存在客户端访问的资源，服务端通过其他手段获取内容（比如从其他资源路径获取内容、去其他服务器获取内容、或者直接写入固定内容）后，返回给客户端
- redirect 是客户端的重定向，服务端中不存在客户端访问的资源，服务端在 response location 中返回其他 URL ，http 状态码为 301 302 303 ，客户端根据这个地址重新发起请求获取资源

## [301 302 303 304 的区别](https://blog.csdn.net/wangjun5159/article/details/51239960)

301 302 303 都表示重定向。

- 301 永久重定向，表示请求的资源分配了新的 URL ，以后都用使用这个新的 URL 获取资源
- 302 临时重定向，表示请求的资源临时分配了新的 URI ，本次请求暂时使用这个新的 URI 获取资源
- 303 和 302 表示基本一致，不同的是需要客户端使用 GET 方法进行请求

304 表示资源未变更

> 客户端发送附带条件的请求时（if-matched,if-modified-since,if-none-match,if-range,if-unmodified-since 任一个）服务器端允许请求访问资源，但因发生请求未满足条件的情况后，直接返回 304Modified（服务器端资源未改变，可直接使用客户端未过期的缓存）。304 状态码返回时，不包含任何响应的主体部分。
