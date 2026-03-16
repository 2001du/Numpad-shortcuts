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
exports.handleNumpad2 = handleNumpad2;
const vscode = __importStar(require("vscode"));
const utils_1 = require("../utils");
/**
 * 小键盘2: 删除当前文件（带二次确认）
 */
async function handleNumpad2() {
    const filePath = (0, utils_1.getCurrentFilePath)();
    if (!filePath) {
        vscode.window.showWarningMessage('没有打开的文件');
        return;
    }
    const fileName = (0, utils_1.getFileName)(filePath);
    const selection = await vscode.window.showWarningMessage(`确定要删除文件 "${fileName}" 吗？`, '确定删除', '取消');
    if (selection === '确定删除') {
        try {
            await vscode.workspace.fs.delete(vscode.Uri.file(filePath));
            vscode.window.showInformationMessage(`文件 "${fileName}" 已删除`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`删除失败: ${error}`);
        }
    }
}
//# sourceMappingURL=numpad2.js.map