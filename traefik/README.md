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

## traefik dashboard 访问控制

traefik dashboard 不建议在域名中可直接访问。

可以通过以下 3 种方式来实现 dashboard 的访问控制：

1. [SSH 隧道访问](https://github.com/tangzhenming/Linux/tree/main/remote_connection#ssh-%E9%9A%A7%E9%81%93)
   1. BasicAuth 认证是对用户名和密码加密，存在被逆编码解密的风险
   2. 推荐直接配置服务器的安全组入站规则，禁掉对应端口远程访问（比如在我们的例子中，禁掉 8080 ，就不会再走到 traefik 转发给 dashboard 服务这一步了）
   3. 然后通过公网 IP 就没办法再访问 dashboard 了，我们可以使用 SSH 隧道进行访问，这是非常安全的
2. 域名 + IP 白名单访问
3. 域名 + 基本认证访问
   1. [秒懂 HTTP 基本认证(Basic Authentication)](https://zhuanlan.zhihu.com/p/64584734)
   2. [Traefik 2 基础授权验证（前篇）](https://blog.csdn.net/soulteary/article/details/110478193)
   3. 在访问的路由规则被匹配到之后就会将请求首先转发到 Middleware 进行验证身份,最后将请求打到对应的服务上
   4. [BasicAuth](https://www.qikqiak.com/traefik-book/middlewares/basicauth/)
   5. [分享：使用 traefik 配置基本认证访问](https://github.com/tangzhenming/DevOps/issues/2)
   6. [htpasswd 的使用](https://www.jianshu.com/p/f4120aa561cc)

## HTTPS 配置

详细阅读 https://www.qikqiak.com/post/traefik-2.1-101/#acme

## References

https://www.psvmc.cn/article/2021-02-23-traefik-start.html

https://www.qikqiak.com/traefik-book/

[一文搞懂 Traefik2.1 的使用](https://www.qikqiak.com/post/traefik-2.1-101/#%E4%B8%AD%E9%97%B4%E4%BB%B6)
