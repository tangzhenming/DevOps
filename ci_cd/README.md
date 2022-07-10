# CICD

基础概念：

- CI，Continuous Integration，持续集成。
- CD，Continuous Deployment，持续部署。(或者 Continuous Delivery，持续交付)
- 部署流程自动化：代码更新到托管仓库后自动进行构建、测试和部署。
- 构建服务器: 进行 CI 构建的服务器，一般用以构建、测试和部署，构建镜像以及自动部署服务。一般也可以是 Docker 容器。
- 部署服务器: 对外提供服务的服务器，容器在该服务器中启动。
- 工作中构建服务器和部署服务器往往作为独立的服务器分开，为了更高的 CICD ，构建服务器会被赋予控制部署服务集群的权限。
- Runner：用于执行 CI/CD 的构建服务器。
- Workflow/Pipeline：CI/CD 的工作流。
- Job：任务，比如构建、测试和部署，多个 Job 可以组合成一个 Pipeline/Workflow 。

## 代码质量管理/分支合并策略

1. 主分支禁止直接提交代码
2. 分支需要经过 PR 才能合并到主分支
3. 分支需要 CI 成功才能合并到主分支
4. 分支需要经过 Code Review
5. 分支需要经过多人同意才能合并到主分支

## 自建 Github Actions Runner 并完成自动部署

[部署项目](https://github.com/tangzhenming/cra-ci-cd)

[Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

[自建 Runner](https://github.com/tangzhenming/DevOps/settings/actions/runners/new?arch=x64&os=linux):

- [Must not run with sudo](https://stackoverflow.com/questions/66085793/must-not-run-with-sudo)，`export RUNNER_ALLOW_RUNASROOT=1`, 或者直接把 actions-runner 文件夹下的 config.sh 中的检测代码注释掉
- 下载并配置完成，[查看 Runner](https://github.com/tangzhenming/DevOps/settings/actions/runners) 发现已经存在自建的 Runner

## 公司的部署方式

基于阿里云的云效 Flow 平台，托管前端源码；使用平台的流水线功能模块，配置流水线源，比如代码仓库、分支，触发事件（代码提交）等；一般就一个任务，这个任务包含三步：1. NodeJS 构建 2. 镜像构建并推送至自定义镜像仓库 3. kubectl 发布（这一步还没看太懂）
