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
exports.getConfiguration = getConfiguration;
exports.executeNumpadCommand = executeNumpadCommand;
const vscode = __importStar(require("vscode"));
const utils_1 = require("./utils");
const numpad1 = __importStar(require("./handlers/numpad1"));
const numpad2 = __importStar(require("./handlers/numpad2"));
const numpad3 = __importStar(require("./handlers/numpad3"));
const numpad4 = __importStar(require("./handlers/numpad4"));
const numpad5 = __importStar(require("./handlers/numpad5"));
const numpad6 = __importStar(require("./handlers/numpad6"));
const numpad7 = __importStar(require("./handlers/numpad7"));
const numpad8 = __importStar(require("./handlers/numpad8"));
const numpad9 = __importStar(require("./handlers/numpad9"));
const numpad0 = __importStar(require("./handlers/numpad0"));
/**
 * 内置功能处理器映射
 */
const builtinHandlers = {
    'builtin:run-file': numpad1.handleNumpad1,
    'builtin:delete-file': numpad2.handleNumpad2,
    'builtin:rename-file': numpad3.handleNumpad3,
    'builtin:copy-path': numpad4.handleNumpad4,
    'builtin:open-folder': numpad5.handleNumpad5,
    'builtin:format-file': numpad6.handleNumpad6,
    'builtin:git-commit': numpad7.handleNumpad7,
    'builtin:copy-file': numpad8.handleNumpad8,
    'builtin:search-file': numpad9.handleNumpad9,
    'builtin:show-functions': numpad0.handleNumpad0,
};
/**
 * 获取配置
 */
function getConfiguration() {
    const config = vscode.workspace.getConfiguration('numpad-shortcuts');
    return {
        num0: config.get('num0', 'builtin:show-functions'),
        num1: config.get('num1', 'builtin:run-file'),
        num2: config.get('num2', 'builtin:delete-file'),
        num3: config.get('num3', 'builtin:rename-file'),
        num4: config.get('num4', 'builtin:copy-path'),
        num5: config.get('num5', 'builtin:open-folder'),
        num6: config.get('num6', 'builtin:format-file'),
        num7: config.get('num7', 'builtin:git-commit'),
        num8: config.get('num8', 'builtin:copy-file'),
        num9: config.get('num9', 'builtin:search-file'),
    };
}
/**
 * 执行小键盘命令
 */
async function executeNumpadCommand(num) {
    const config = getConfiguration();
    let command = config[`num${num}`];
    // 如果命令为空，使用默认内置功能
    if (!command || command.trim() === '') {
        const defaults = {
            0: 'builtin:show-functions',
            1: 'builtin:run-file',
            2: 'builtin:delete-file',
            3: 'builtin:rename-file',
            4: 'builtin:copy-path',
            5: 'builtin:open-folder',
            6: 'builtin:format-file',
            7: 'builtin:git-commit',
            8: 'builtin:copy-file',
            9: 'builtin:search-file',
        };
        command = defaults[num];
    }
    // 如果还是没有有效的命令
    if (!command) {
        vscode.window.showWarningMessage(`小键盘 ${num} 未配置`);
        return;
    }
    // 检查是否是内置功能
    if (command.startsWith('builtin:')) {
        const handler = builtinHandlers[command];
        if (handler) {
            try {
                await handler();
            }
            catch (error) {
                vscode.window.showErrorMessage(`执行内置功能失败: ${error}`);
            }
        }
        else {
            vscode.window.showErrorMessage(`未知的内置功能: ${command}`);
        }
    }
    else {
        // 执行自定义命令
        try {
            const expandedCommand = (0, utils_1.replaceVariables)(command);
            const terminal = vscode.window.activeTerminal || vscode.window.createTerminal('Numpad Shortcut');
            terminal.show();
            terminal.sendText(expandedCommand);
            vscode.window.showInformationMessage(`已执行: ${expandedCommand}`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`执行命令失败: ${error}`);
        }
    }
}
//# sourceMappingURL=commandExecutor.js.map