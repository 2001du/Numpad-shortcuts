#!/bin/bash

# CNB 环境初始化脚本
# 用于自动配置 Node.js 开发环境

set -e  # 遇到错误立即退出

echo "========================================"
echo "CNB 环境初始化脚本"
echo "========================================"

# 1. 检查 Node.js 是否已安装
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    echo "请确保 CNB 环境已配置 Node.js 基础镜像"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"

# 2. 安装项目依赖
echo ""
echo "📦 安装项目依赖..."
cd /workspace
npm install
echo "✅ 依赖安装完成"

# 3. 编译 TypeScript
echo ""
echo "🔨 编译 TypeScript..."
npm run compile
echo "✅ 编译完成"

# 4. 安装全局工具
echo ""
echo "🛠️  安装全局工具 (@vscode/vsce)..."
npm install -g @vscode/vsce
echo "✅ vsce 安装完成: $(vsce --version)"

# 5. 验证环境
echo ""
echo "========================================"
echo "环境验证"
echo "========================================"
echo "✅ Node.js: $(which node)"
echo "✅ npm: $(which npm)"
echo "✅ vsce: $(which vsce)"
echo "✅ TypeScript: $(which tsc)"

# 6. 显示后续使用说明
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
