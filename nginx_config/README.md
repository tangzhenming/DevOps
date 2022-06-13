## root & index

root: 静态资源的根路径，默认情况下 root 为 /usr/share/nginx/html ，因此我们部署前端时，往往将构建后的静态资源目录挂载到该地址

index: 当请求路径以 / 结尾时，则自动寻找该路径下的 index 文件

## add_header

控制响应头。

由于很多特性都是通过响应头控制，因此基于此指令可做很多事情，比如:

- Cache

```nginx
location /static {
     add_header Cache-Control max-age=31536000;
 }
```

- CORS

```nginx
location /api {
   add_header Access-Control-Allow-Origin *;
}
```

- HSTS

```nginx
location / {
   listen 443 ssl;

   add_header Strict-Transport-Security max-age=7200;
}
```

- CSP

```nginx
location / {
   add_header Content-Security-Policy "default-src 'self';";
}
```
