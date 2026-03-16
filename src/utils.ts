import * as vscode from 'vscode';

/**
 * 获取当前活动的编辑器
 */
export function getCurrentEditor() {
    return vscode.window.activeTextEditor;
}

/**
 * 获取当前文件的完整路径
 */
export function getCurrentFilePath(): string | null {
    const editor = getCurrentEditor();
    return editor?.document.uri.fsPath || null;
}

/**
 * 获取文件名（包含扩展名）
 */
export function getFileName(filePath: string): string {
    const lastSlash = filePath.lastIndexOf('/');
    const lastBackslash = filePath.lastIndexOf('\\');
    const lastSeparator = Math.max(lastSlash, lastBackslash);
    return filePath.substring(lastSeparator + 1);
}

/**
 * 获取文件扩展名（包含点号）
 */
export function getFileExtension(filePath: string): string {
    const fileName = getFileName(filePath);
    const lastDot = fileName.lastIndexOf('.');
    return lastDot !== -1 ? fileName.substring(lastDot) : '';
}

/**
 * 获取文件所在目录
 */
export function getFileDir(filePath: string): string {
    const lastSlash = filePath.lastIndexOf('/');
    const lastBackslash = filePath.lastIndexOf('\\');
    const lastSeparator = Math.max(lastSlash, lastBackslash);
    return filePath.substring(0, lastSeparator);
}

/**
 * 获取工作区路径
 */
export function getWorkspacePath(): string | null {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    return workspaceFolders && workspaceFolders.length > 0
        ? workspaceFolders[0].uri.fsPath
        : null;
}

/**
 * 替换变量占位符
 * 支持的变量：
 * ${file} - 当前文件路径
 * ${fileName} - 当前文件名
 * ${fileDir} - 文件所在目录
 * ${workspace} - 工作区路径
 */
export function replaceVariables(command: string): string {
    const filePath = getCurrentFilePath();
    if (!filePath) {
        return command;
    }

    let result = command;
    result = result.replace(/\$\{file\}/g, filePath);
    result = result.replace(/\$\{fileName\}/g, getFileName(filePath));
    result = result.replace(/\$\{fileDir\}/g, getFileDir(filePath));

    const workspacePath = getWorkspacePath();
    if (workspacePath) {
        result = result.replace(/\$\{workspace\}/g, workspacePath);
    }

    return result;
}
