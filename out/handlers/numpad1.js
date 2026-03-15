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
exports.handleNumpad1 = handleNumpad1;
const vscode = __importStar(require("vscode"));
const utils_1 = require("../utils");
/**
 * 小键盘1: 运行当前文件
 */
async function handleNumpad1() {
    const filePath = (0, utils_1.getCurrentFilePath)();
    if (!filePath) {
        vscode.window.showWarningMessage('没有打开的文件');
        return;
    }
    const ext = (0, utils_1.getFileExtension)(filePath);
    let command = '';
    switch (ext) {
        case '.js':
            command = `node "${filePath}"`;
            break;
        case '.ts':
            command = `ts-node "${filePath}"`;
            break;
        case '.py':
            command = `python "${filePath}"`;
            break;
        case '.java':
            command = `javac "${filePath}" && java ${(0, utils_1.getFileName)(filePath).replace('.java', '')}`;
            break;
        case '.cpp':
            command = `g++ "${filePath}" -o "${filePath.replace('.cpp', '')}" && "${filePath.replace('.cpp', '')}"`;
            break;
        case '.go':
            command = `go run "${filePath}"`;
            break;
        case '.rs':
            command = `rustc "${filePath}" -o "${filePath.replace('.rs', '')}" && "${filePath.replace('.rs', '')}"`;
            break;
        case '.php':
            command = `php "${filePath}"`;
            break;
        case '.rb':
            command = `ruby "${filePath}"`;
            break;
        case '.sh':
            command = `bash "${filePath}"`;
            break;
        default:
            vscode.window.showWarningMessage(`不支持的文件类型: ${ext}`);
            return;
    }
    const terminal = vscode.window.activeTerminal || vscode.window.createTerminal('Run File');
    terminal.show();
    terminal.sendText(command);
    vscode.window.showInformationMessage(`正在运行: ${(0, utils_1.getFileName)(filePath)}`);
}
//# sourceMappingURL=numpad1.js.map