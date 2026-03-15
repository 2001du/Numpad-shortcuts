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
exports.handleNumpad7 = handleNumpad7;
const vscode = __importStar(require("vscode"));
const utils_1 = require("../utils");
/**
 * 小键盘7: Git 提交当前文件
 */
async function handleNumpad7() {
    const filePath = (0, utils_1.getCurrentFilePath)();
    if (!filePath) {
        vscode.window.showWarningMessage('没有打开的文件');
        return;
    }
    const fileName = (0, utils_1.getFileName)(filePath);
    const commitMessage = await vscode.window.showInputBox({
        prompt: '输入提交信息',
        placeHolder: 'feat: add new feature'
    });
    if (commitMessage && commitMessage.trim() !== '') {
        const terminal = vscode.window.activeTerminal || vscode.window.createTerminal('Git Commit');
        terminal.show();
        terminal.sendText(`git add "${filePath}"`);
        terminal.sendText(`git commit -m "${commitMessage}"`);
        vscode.window.showInformationMessage(`文件 "${fileName}" 已提交到 Git`);
    }
}
//# sourceMappingURL=numpad7.js.map