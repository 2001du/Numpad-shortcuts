# CNB 云开发平台环境配置指南

## 问题诊断结果

经过检查，你的环境问题有以下 **3 个主要原因**：

### 1. ❌ Node.js 未安装
```
node not found
npm not found
```
**原因**: 当前 CNB 环境没有配置 Node.js 基础镜像

### 2. ❌ 没有持久化目录
```
/persist: No such file or directory
```
**原因**: 没有配置持久化存储，每次环境重建都会丢失 `node_modules` 和全局工具

### 3. ❌ 没有 .cnb.yml 配置文件
**原因**: 没有 `.cnb.yml` 配置自动初始化步骤，导致每次进入环境都需要手动安装依赖

---

## 已创建的解决方案文件

我已经为你创建了以下文件来解决这些问题：

### 1. `/workspace/.cnb.yml` - CNB 环境配置文件
```
作用: 定义环境初始化步骤和持久化配置
```

**配置说明：**
```yaml
environment:
  base_image: node:18-alpine  # 使用 Node.js 18 基础镜像

stages:
  - name: setup-environment
    script: |
      chmod +x /workspace/setup.sh
      /workspace/setup.sh    # 调用初始化脚本

persistence:
  - source: /workspace/node_modules  # 持久化依赖包
    target: /persist/node_modules

  - source: /workspace/out            # 持久化编译输出
    target: /persist/out

  - source: /root/.npm               # 持久化 npm 缓存
    target: /persist/npm-cache
```

---

### 2. `/workspace/setup.sh` - 环境初始化脚本
```
作用: 自动安装依赖和配置环境
```

**脚本功能：**
1. ✅ 检查 Node.js 是否已安装
2. ✅ 安装项目依赖 (`npm install`)
3. ✅ 编译 TypeScript (`npm run compile`)
4. ✅ 安装全局工具 vsce
5. ✅ 验证环境配置
6. ✅ 显示使用说明

---

### 3. 更新了 `package.json`
添加了 `package` 脚本：
```json
"scripts": {
  "package": "npx @vscode/vsce package"
}
```

**为什么要添加这个脚本？**
- 使用 `npx` 而不是全局安装 vsce
- 避免全局工具丢失问题
- 每次都使用最新版本

---

## 如何使用

### 方案 A: 重建 CNB 环境（推荐）

1. **提交这些新文件到仓库**
   ```bash
   git add .cnb.yml setup.sh
   git commit -m "Add CNB environment configuration"
   git push
   ```

2. **在 CNB 平台重建环境**
   - 找到项目设置
   - 选择"重建环境"或"重新配置"
   - CNB 会读取 `.cnb.yml` 并自动执行初始化脚本

3. **等待初始化完成**
   - 自动安装 Node.js
   - 自动安装依赖
   - 自动配置环境

4. **验证环境**
   ```bash
   node --version
   npm --version
   vsce --version
   ```

---

### 方案 B: 临时解决方案（立即可用）

如果无法立即重建环境，可以使用以下临时方案：

#### 1. 手动运行初始化脚本
```bash
# 赋予脚本执行权限
chmod +x /workspace/setup.sh

# 运行脚本
/workspace/setup.sh
```

**注意**: 这会报错，因为当前环境没有 Node.js。

#### 2. 使用 npx（如果 CNB 支持）
```bash
# 直接使用 npx，不需要全局安装
npx @vscode/vsce package
```

**前提**: CNB 环境中至少要有 Node.js

#### 3. 本地开发（最可靠）
如果 CNB 环境持续有问题，建议：
1. 在本地安装 Node.js
2. 在本地开发和测试
3. 使用 CNB 仅用于代码托管和协作

---

## 为什么每次都要重新安装？

### CNB 环境的工作原理

```
┌─────────────────────────────────────┐
│  CNB 云开发平台                      │
├─────────────────────────────────────┤
│  每次会话 = 全新的临时环境            │
│                                     │
│  ❌ 不会保留:                        │
│     - 全局安装的工具 (npm -g)        │
│     - node_modules                  │
│     - 环境变量修改                   │
│     - 配置文件 (.bashrc, .zshrc)     │
│                                     │
│  ✅ 会保留:                          │
│     - 源代码文件                     │
│     - Git 历史记录                   │
│     - 持久化目录 (/persist)          │
└─────────────────────────────────────┘
```

### 为什么需要持久化配置？

**没有持久化：**
```
第一次会话: npm install → node_modules 创建
第二次会话: node_modules 消失 → 需要重新安装
第三次会话: node_modules 消失 → 又要重新安装
...
```

**有持久化：**
```
第一次会话: npm install → node_modules 创建并保存到 /persist
第二次会话: 从 /persist 恢复 node_modules → 无需重新安装
第三次会话: 从 /persist 恢复 node_modules → 无需重新安装
...
```

---

## 持久化配置说明

### /persist 目录的作用

`.cnb.yml` 中配置的持久化规则：

```yaml
persistence:
  - source: /workspace/node_modules  # 源目录
    target: /persist/node_modules    # 持久化目标
```

**工作流程：**

1. **环境启动时**:
   ```
   从 /persist/node_modules 复制到 /workspace/node_modules
   ```

2. **环境关闭时**:
   ```
   将 /workspace/node_modules 保存到 /persist/node_modules
   ```

3. **下次启动时**:
   ```
   直接从持久化目录恢复，无需重新安装
   ```

---

## 常见问题

### Q1: 为什么需要 .cnb.yml？

**A:** `.cnb.yml` 是 CNB 环境的核心配置文件，用于：
- 定义基础镜像（如 node:18-alpine）
- 配置自动初始化步骤
- 设置持久化规则
- 配置环境变量

### Q2: 为什么推荐使用脚本而不是直接在 .cnb.yml 中写命令？

**A:**
1. **易于测试**: 可以在终端中直接运行脚本测试
2. **可复用**: 脚本可以在其他项目中使用
3. **易于维护**: 脚本比 YAML 更容易写复杂逻辑
4. **减少重建**: 修改脚本不需要重建整个环境

### Q3: 为什么推荐使用 npx 而不是全局安装？

**A:**
1. **不需要持久化**: npx 自动下载，不依赖全局环境
2. **总是最新版本**: 每次都使用最新版本的包
3. **避免版本冲突**: 不会因为环境重置而失效
4. **更轻量**: 不占用持久化空间

### Q4: 如何检查持久化是否生效？

**A:**
```bash
# 检查持久化目录
ls -la /persist

# 安装依赖
npm install

# 查看是否有 node_modules
ls -la /workspace/node_modules

# 检查是否同步到持久化目录
ls -la /persist/node_modules
```

### Q5: 如何添加更多的初始化步骤？

**A:** 编辑 `setup.sh`，添加你的命令：

```bash
#!/bin/bash

# 安装依赖
npm install

# 编译
npm run compile

# 安装 vsce
npm install -g @vscode/vsce

# 添加更多步骤
# 例如：运行测试
npm test

# 例如：生成文档
npm run docs
```

---

## 下一步操作

### 立即执行（推荐）

1. **在 CNB 平台重建环境**
   - 使用新的 `.cnb.yml` 配置
   - 等待自动初始化完成

2. **验证环境**
   ```bash
   node --version      # 应该显示 v18.x.x
   npm --version       # 应该显示 npm 9.x.x
   vsce --version      # 应该显示 vsce 版本
   ```

3. **打包插件**
   ```bash
   npm run package
   # 或
   npx @vscode/vsce package
   ```

---

### 如果无法重建环境

**联系 CNB 技术支持**，询问：
1. 如何配置 Node.js 基础镜像
2. 如何启用持久化目录
3. `.cnb.yml` 的具体使用方法

---

## 总结

### 问题根源
```
❌ 没有 .cnb.yml → 环境初始化
❌ 没有持久化配置 → 依赖丢失
❌ 没有基础镜像 → Node.js 不存在
```

### 解决方案
```
✅ 创建 .cnb.yml → 自动初始化
✅ 配置持久化 → 依赖保留
✅ 创建 setup.sh → 一键配置
✅ 使用 npx → 避免全局工具问题
```

### 关键要点
1. **持久化是关键**: 配置 `/persist` 避免重复安装
2. **.cnb.yml 是核心**: 定义环境初始化步骤
3. **脚本化配置**: 使用 setup.sh 简化管理
4. **npx 优先**: 避免全局工具丢失

---

## 文件清单

已创建/修改的文件：

| 文件 | 状态 | 作用 |
|------|------|------|
| `.cnb.yml` | ✅ 新建 | CNB 环境配置文件 |
| `setup.sh` | ✅ 新建 | 环境初始化脚本 |
| `package.json` | ✅ 修改 | 添加 package 脚本 |

**下一步**: 提交这些文件，然后在 CNB 平台重建环境。
