FROM alpine:latest

WORKDIR /plugins

# 复制 VSIX 文件
COPY numpad-shortcuts-1.0.0.vsix .

# 添加说明文档
RUN echo "========================================" > README.txt && \
    echo "  Numpad Shortcuts VSCode Extension" >> README.txt && \
    echo "========================================" >> README.txt && \
    echo "" >> README.txt && \
    echo "Version: 1.0.0" >> README.txt && \
    echo "" >> README.txt && \
    echo "----------------------------------------" >> README.txt && \
    echo "Download and Install:" >> README.txt && \
    echo "----------------------------------------" >> README.txt && \
    echo "1. 下载:" >> README.txt && \
    echo "   docker run --rm -v \$(pwd):/output dyh159753/numpad:latest cp numpad-shortcuts-1.0.0.vsix /output/" >> README.txt && \
    echo "" >> README.txt && \
    echo "2. 安装插件到 VSCode:" >> README.txt && \
    echo "   - Open VSCode" >> README.txt && \
    echo "   - Go to Extensions (Ctrl+Shift+X)" >> README.txt && \
    echo "   - Click ... (three dots) -> Install from VSIX..." >> README.txt && \
    echo "   - Select numpad-shortcuts-1.0.0.vsix" >> README.txt && \
    echo "" >> README.txt && \
    echo "----------------------------------------" >> README.txt && \
    echo "功能：" >> README.txt && \
    echo "Numpad 0 - Show all functions" >> README.txt && \
    echo "Numpad 1 - Run current file" >> README.txt && \
    echo "          Supports: JS, TS, Python, Java, C++, Go, Rust, PHP, Ruby, Shell" >> README.txt && \
    echo "Numpad 2 - Delete current file (with confirmation)" >> README.txt && \
    echo "Numpad 3 - Rename current file" >> README.txt && \
    echo "Numpad 4 - Copy current file path to clipboard" >> README.txt && \
    echo "Numpad 5 - Open file folder in explorer" >> README.txt && \
    echo "Numpad 6 - Format current file" >> README.txt && \
    echo "Numpad 7 - Git commit current file" >> README.txt && \
    echo "Numpad 8 - Create file copy" >> README.txt && \
    echo "Numpad 9 - Search in current file" >> README.txt && \
    echo "" >> README.txt && \
    echo "----------------------------------------" >> README.txt && \
    echo "docker run --rm dyh159753/numpad:latest cat README.txt" >> README.txt

# 默认显示文件列表
CMD ["ls", "-lh"]
