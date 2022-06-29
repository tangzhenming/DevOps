# traefik

## 搭建

基于 docker 镜像即可搭建 traefik ，[搭建示例](https://github.com/tangzhenming/DevOps/blob/main/traefik/example/)

## traefik 解决了什么问题

1. 提供了自动的服务发现，同时收集每个服务的健康状态
2. 实现了反向代理与负载均衡
3. 可配置 TLS ，开启这项配置后，我们的域名就可以使用 HTTPS 访问
   1. 安全传输层协议（TLS）用于在两个通信应用程序之间提供保密性和数据完整性。
   2. [TLS 协议详解！](https://blog.csdn.net/weixin_46622350/article/details/120806194)
   3. HTTPS 是 HTTP 协议的一种扩展，它本身并不保传输的证安全性，那么谁来保证安全性呢？在 HTTPS 中，使用传输层安全性(TLS)或安全套接字层(SSL)对通信协议进行加密。也就是 HTTP + SSL(TLS) = HTTPS。
4. 可配置 AccessLogs ，开启这项配置后， traefik 会自动收集每个服务的请求日志

## References

https://www.psvmc.cn/article/2021-02-23-traefik-start.html
