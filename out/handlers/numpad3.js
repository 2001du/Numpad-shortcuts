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
exports.handleNumpad3 = handleNumpad3;
const vscode = __importStar(require("vscode"));
const utils_1 = require("../utils");
/**
 * 小键盘3: 重命名当前文件
 */
async function handleNumpad3() {
    const filePath = (0, utils_1.getCurrentFilePath)();
    if (!filePath) {
        vscode.window.showWarningMessage('没有打开的文件');
        return;
    }
    const fileName = (0, utils_1.getFileName)(filePath);
    const ext = (0, utils_1.getFileExtension)(filePath);
    const baseName = fileName.substring(0, fileName.lastIndexOf('.'));
    const newName = await vscode.window.showInputBox({
        prompt: '输入新文件名',
        value: baseName,
        placeHolder: '新文件名'
    });
    if (newName && newName.trim() !== '') {
        const dirPath = (0, utils_1.getFileDir)(filePath);
        const newPath = `${dirPath}/${newName}${ext}`;
        try {
            await vscode.workspace.fs.rename(vscode.Uri.file(filePath), vscode.Uri.file(newPath));
            vscode.window.showInformationMessage(`文件已重命名为: ${newName}${ext}`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`重命名失败: ${error}`);
        }
    }
}
//# sourceMappingURL=numpad3.js.map