# CICD

CI，Continuous Integration，持续集成。

CD，Continuous Deployment，持续部署。(或者 Continuous Delivery，持续交付)

部署流程自动化：代码更新到托管仓库后自动进行构建、测试和部署。

构建服务器: 进行 CI 构建的服务器，一般用以构建、测试和部署，构建镜像以及自动部署服务。一般也可以是 Docker 容器。

部署服务器: 对外提供服务的服务器，容器在该服务器中启动。

工作中构建服务器和部署服务器往往作为独立的服务器分开，为了更高的 CICD ，构建服务器会被赋予控制部署服务集群的权限。

Runner：用于执行 CI/CD 的构建服务器。

Workflow/Pipeline：CI/CD 的工作流。

Job：任务，比如构建、测试和部署，多个 Job 可以组合成一个 Pipeline/Workflow 。