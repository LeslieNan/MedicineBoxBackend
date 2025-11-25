FROM docker.1ms.run/node:24-slim
# FROM insta-registry-vpc.cn-shanghai.cr.aliyuncs.com/public/node:24-slim

WORKDIR /app

# Npm国内镜像
RUN npm config set registry https://registry.npmmirror.com

# 复制依赖文件并安装依赖
COPY package.json .
COPY package-lock.json .
RUN npm install

# 复制源码
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
