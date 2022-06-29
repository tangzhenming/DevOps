# 将静态资源部署到 OSS/CDN

[阿里云 oss 控制台](https://oss.console.aliyun.com/overview)

## [使用 ossutil 上传至 oss](https://github.com/tangzhenming/DevOps/tree/main/oss/cra_ossutil_to_oss)

## [使用脚本集成 ali-oss/p-queque ，控制静态资源上传至 oss](https://github.com/tangzhenming/DevOps/tree/main/oss/cra_script_to_oss)

## [使用 vercel 部署项目](https://github.com/tangzhenming/DevOps/tree/main/oss/cra_terminal_to_vc)

## [Mac 环境变量配置](https://www.jianshu.com/p/2af08672f55c)

[understand-etc-paths-pathsd-mac](https://golangbyexample.com/understand-etc-paths-pathsd-mac/)

[usr/bin 以及 usr/local/bin](https://www.jianshu.com/p/c74d1446da7c)

Mac 环境变量加载顺序：

1. `/etc/profile`：系统全局配置文件
2. `/etc/paths`：系统全局配置文件，里面的目录都会被添加到环境变量中
3. `~/.bash_profile`

   1. 如果 `~/.bash_profile` 存在，后面几个文件就会忽略不读
      添加环境变量：

      ```bash
      # 1. vi ~/.bash_profile
      # 2. export ENVVAR=VALUE
      # 3. 重启 shell 或者 source ~/.bash_profile
      # .bash_login .profile .bashrc 同上
      ```

   2. 在使用其他 shell 比如 zsh 时，终端默认启动 zsh ，加载的是 `~/.zshrc` ，所以 .bash_profile 文件中的环境变量就无法起到作用，需在 `~/.zshrc`，增加 `source ~/.bash_profile`

4. ` ~/.bash_login` 5. `~/.profile` 6. `~/.bashrc`：始终加载，加载时机为 bash shell 打开的时候
