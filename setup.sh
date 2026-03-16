#!/bin/bash

# CNB 环境初始化脚本
# 用于自动配置 Node.js 开发环境

set -e  # 遇到错误立即退出

echo "========================================"
echo "CNB 环境初始化脚本"
echo "========================================"

# 首次运行检测标记文件
INIT_MARKER="/workspace/.cnb-initialized"

# 0. 检查是否已经初始化过
if [ -f "$INIT_MARKER" ]; then
    echo "✅ 环境已初始化，跳过安装步骤"
    echo ""

    # 只恢复持久化数据（如果存在）
    if [ -d "/persist" ]; then
        echo "📂 恢复持久化数据..."

        # 恢复 node_modules（如果本地不存在）
        if [ -d "/persist/node_modules" ] && [ ! -d "/workspace/node_modules" ]; then
            echo "  - 恢复 node_modules..."
            cp -r /persist/node_modules /workspace/
        fi

        # 恢复编译输出（如果本地不存在）
        if [ -d "/persist/out" ] && [ ! -d "/workspace/out" ]; then
            echo "  - 恢复编译输出..."
            cp -r /persist/out /workspace/
        fi

        echo "✅ 持久化数据恢复完成"
    fi

    echo "✨ 环境就绪！"
    exit 0
fi

# 如果没有初始化标记，执行完整初始化
echo "🚀 首次运行，开始初始化..."

# 0. 恢复持久化的数据（如果有）
echo ""
echo "📂 检查持久化数据..."

if [ -d "/persist" ]; then
    echo "🔄 发现持久化数据，开始恢复..."

    # 恢复 node_modules
    if [ -d "/persist/node_modules" ] && [ ! -d "/workspace/node_modules" ]; then
        echo "  - 恢复 node_modules..."
        cp -r /persist/node_modules /workspace/
    fi

    # 恢复编译输出
    if [ -d "/persist/out" ] && [ ! -d "/workspace/out" ]; then
        echo "  - 恢复编译输出..."
        cp -r /persist/out /workspace/
    fi

    # 恢复 npm 缓存
    if [ -d "/persist/npm-cache" ]; then
        echo "  - 恢复 npm 缓存..."
        mkdir -p /root/.npm
        cp -r /persist/npm-cache/* /root/.npm/ 2>/dev/null || true
    fi

    echo "✅ 持久化数据恢复完成"
else
    echo "⚠️  /persist 目录不存在，将从零开始安装"
    mkdir -p /persist
fi

# 1. 加载 nvm（如果存在）
if [ -f "/persist/nvm/nvm.sh" ]; then
    echo "🔄 加载持久化的 nvm..."
    export NVM_DIR="/persist/nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    echo "✅ nvm 已加载"
fi

# 2. 检查 Node.js 是否已安装
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    echo "正在尝试安装 Node.js 18..."

    # 如果 nvm 可用，使用 nvm 安装
    if command -v nvm &> /dev/null; then
        nvm install 18
        nvm use 18
    else
        echo "请确保 CNB 环境已配置 Node.js 基础镜像"
        exit 1
    fi
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"

# 2. 安装项目依赖（如果 node_modules 不存在）
echo ""
echo "📦 检查项目依赖..."
cd /workspace

if [ ! -d "node_modules" ]; then
    echo "  node_modules 不存在，正在安装依赖..."
    npm install
    echo "✅ 依赖安装完成"
else
    echo "✅ node_modules 已存在，跳过安装"
fi

# 3. 编译 TypeScript（如果 out 目录不存在或为空）
echo ""
echo "🔨 检查编译输出..."
if [ ! -d "out" ] || [ -z "$(ls -A out)" ]; then
    echo "  out 目录不存在或为空，正在编译 TypeScript..."
    npm run compile
    echo "✅ 编译完成"
else
    echo "✅ 编译输出已存在，跳过编译"
fi

# 4. 安装全局工具
echo ""
echo "🛠️  检查全局工具..."
if ! command -v vsce &> /dev/null; then
    echo "  正在安装全局工具 (@vscode/vsce)..."
    npm install -g @vscode/vsce
    echo "✅ vsce 安装完成: $(vsce --version)"
else
    echo "✅ vsce 已安装: $(vsce --version)"
fi

# 5. 验证环境
echo ""
echo "========================================"
echo "环境验证"
echo "========================================"
echo "✅ Node.js: $(which node)"
echo "✅ npm: $(which npm)"
echo "✅ vsce: $(which vsce)"
echo "✅ TypeScript: $(which tsc)"

# 6. 创建初始化标记
echo ""
echo "📝 创建初始化标记..."
touch "$INIT_MARKER"
echo "✅ 初始化标记已创建"

# 7. 备份到持久化目录
echo ""
echo "💾 备份数据到持久化目录..."
if [ -d "/persist" ]; then
    # 备份 node_modules
    if [ -d "/workspace/node_modules" ]; then
        echo "  - 备份 node_modules..."
        cp -r /workspace/node_modules /persist/
    fi

    # 备份编译输出
    if [ -d "/workspace/out" ]; then
        echo "  - 备份编译输出..."
        cp -r /workspace/out /persist/
    fi

    # 备份 npm 缓存
    if [ -d "/root/.npm" ]; then
        echo "  - 备份 npm 缓存..."
        mkdir -p /persist/npm-cache
        cp -r /root/.npm/* /persist/npm-cache/ 2>/dev/null || true
    fi

    echo "✅ 备份完成"
fi

# 8. 显示后续使用说明
echo ""
echo "========================================"
echo "✨ 初始化完成！"
echo "========================================"
echo ""
echo "常用命令："
echo "  - 编译:      npm run compile"
echo "  - 监听模式:  npm run watch"
echo "  - 打包插件:  npm run package"
echo "  - 或使用:    npx @vscode/vsce package"
echo ""
