FROM node:14-alpine

WORKDIR /code

ADD package.json package-lock.json /code/
RUN npm install

# 执行到这里之前的代码如果都没有发生变动，每一层都会命中缓存，不会再重新生成新的层
# 所以把 package.json package-lock.json 都单独拎出来作为一层帮助我们进行缓存优化
# 比如当 src 下的代码发生了变动，但其实依赖并没有任何更新，那么我们就无须重新构建我们的依赖，即无需重新执行 npm install 命令，我们只需要 build 即可

# 这里假设 src 中的代码发生了变化，那么从这一层开始就会重新生成，后面的 build 也会重新执行
# 而假设包括 src 在内，当前目录 . 下的所有代码都没有变化，那么后续也会继续命中缓存，即不会重新再执行 build 命令
ADD . /code
RUN npm run build

CMD npx serve -s build
EXPOSE 3000