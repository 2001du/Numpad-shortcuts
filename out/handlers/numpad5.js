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
exports.handleNumpad5 = handleNumpad5;
const vscode = __importStar(require("vscode"));
const utils_1 = require("../utils");
/**
 * 小键盘5: 打开文件所在文件夹
 */
async function handleNumpad5() {
    const filePath = (0, utils_1.getCurrentFilePath)();
    if (!filePath) {
        vscode.window.showWarningMessage('没有打开的文件');
        return;
    }
    const folderPath = (0, utils_1.getFileDir)(filePath);
    const uri = vscode.Uri.file(folderPath);
    // 检查文件夹是否已在工作区中
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
    if (workspaceFolder) {
        await vscode.commands.executeCommand('revealInExplorer', uri);
    }
    else {
        await vscode.commands.executeCommand('vscode.openFolder', uri, { forceNewWindow: false });
    }
    vscode.window.showInformationMessage(`已打开文件夹: ${folderPath}`);
}
//# sourceMappingURL=numpad5.js.map