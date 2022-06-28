# 使用 vercel 部署项目

[npm i -g vercel](https://vercel.com/docs/cli)

`vercel login`

`vercel --prod`

## 域名解析到 vercel 部署的项目

参考目前已解析的域名，[只需要把 vercel 的 IPV4 地址添加到域名解析列表中即可](https://vercel.com/docs/get-started/assign-domain)。

注意：通过 cli 去部署 vercel 应用时，不能在 vercel 上把 deployment 发布到 production （接入 github 就可以），所以在 cli 中需要通过 `vercel --prod` 进行部署。

## References

[超级简单部署网页到 Vercel](https://juejin.cn/post/7065115103720374302)
