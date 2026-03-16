# 使用 Node.js 官方镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /workspace

# 安装常用工具
RUN apk add --no-cache \
    git \
    zsh \
    curl \
    wget \
    vim \
    && rm -rf /var/cache/apk/*

# 配置 npm 使用淘宝镜像（可选，加速下载）
# RUN npm config set registry https://registry.npmmirror.com

# 安装全局工具
RUN npm install -g @vscode/vsce typescript

# 设置环境变量
ENV NODE_ENV=development

# 默认命令
CMD ["/bin/sh"]
