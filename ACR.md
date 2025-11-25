## 登录ACR

```sh
podman login --username=qingyuehanxi@insta insta-registry.cn-shanghai.cr.aliyuncs.com
```

## 基础镜像上传

- Nodejs

```sh
podman pull --platform linux/amd64 node:24-bookworm
podman tag node:24-bookworm insta-registry.cn-shanghai.cr.aliyuncs.com/public/node:24-bookworm
podman push insta-registry.cn-shanghai.cr.aliyuncs.com/public/node:24-bookworm
```

- Python

```sh
podman pull --platform linux/amd64 python:3.14-bookworm
podman tag python:3.14-bookworm insta-registry.cn-shanghai.cr.aliyuncs.com/public/python:3.14-bookworm
podman push insta-registry.cn-shanghai.cr.aliyuncs.com/public/python:3.14-bookworm
```

## ECS里

```sh
podman pull docker.1ms.run/node:24-slim
podman tag docker.1ms.run/node:24-slim insta-registry-vpc.cn-shanghai.cr.aliyuncs.com/public/node:24-slim
podman push insta-registry-vpc.cn-shanghai.cr.aliyuncs.com/public/node:24-slim
```
