"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentEditor = getCurrentEditor;
exports.getCurrentFilePath = getCurrentFilePath;
exports.getFileName = getFileName;
exports.getFileExtension = getFileExtension;
exports.getFileDir = getFileDir;
exports.getWorkspacePath = getWorkspacePath;
exports.replaceVariables = replaceVariables;
const vscode = __importStar(require("vscode"));
/**
 * 获取当前活动的编辑器
 */
function getCurrentEditor() {
    return vscode.window.activeTextEditor;
}
/**
 * 获取当前文件的完整路径
 */
function getCurrentFilePath() {
    const editor = getCurrentEditor();
    return editor?.document.uri.fsPath || null;
}
/**
 * 获取文件名（包含扩展名）
 */
function getFileName(filePath) {
    const lastSlash = filePath.lastIndexOf('/');
    const lastBackslash = filePath.lastIndexOf('\\');
    const lastSeparator = Math.max(lastSlash, lastBackslash);
    return filePath.substring(lastSeparator + 1);
}
/**
 * 获取文件扩展名（包含点号）
 */
function getFileExtension(filePath) {
    const fileName = getFileName(filePath);
    const lastDot = fileName.lastIndexOf('.');
    return lastDot !== -1 ? fileName.substring(lastDot) : '';
}
/**
 * 获取文件所在目录
 */
function getFileDir(filePath) {
    const lastSlash = filePath.lastIndexOf('/');
    const lastBackslash = filePath.lastIndexOf('\\');
    const lastSeparator = Math.max(lastSlash, lastBackslash);
    return filePath.substring(0, lastSeparator);
}
/**
 * 获取工作区路径
 */
function getWorkspacePath() {
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
function replaceVariables(command) {
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
//# sourceMappingURL=utils.js.map