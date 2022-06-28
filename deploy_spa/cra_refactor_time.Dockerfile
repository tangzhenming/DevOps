FROM node:14-alpine

WORKDIR /code

ADD package.json package-lock.json /code/
RUN npm install

# 前端项目构建时间主要消耗在 `npm install` 和 `npm build`
# docker 是基于联合文件系统的，每次 ADD 的时候都会单独生成一层，如果这一层的内容不变，就会直接使用之前构建的缓存，不会再生成新的层
# 如果有文件改变 就会导致 cache 失效了，一般来说 package.json 的变动频率会小于 src 的文件，所以选择把 package 单独拿出来先跑 install，最大程度利用缓存

# 执行到这里之前的代码如果都没有发生变动，每一层都会命中缓存，不会再重新生成新的层
# 所以把 package.json package-lock.json 都单独拎出来作为一层帮助我们进行缓存优化
# 比如当 src 下的代码发生了变动，但其实依赖并没有任何更新，那么我们就无须重新构建我们的依赖，即无需重新执行 npm install 命令，我们只需要 build 即可

# 这里假设 src 中的代码发生了变化，那么从这一层开始就会重新生成，后面的 build 也会重新执行
# 而假设包括 src 在内，当前目录 . 下的所有代码都没有变化，那么后续也会继续命中缓存，即不会重新再执行 build 命令
ADD . /code
RUN npm run build

CMD npx serve -s build
EXPOSE 3000