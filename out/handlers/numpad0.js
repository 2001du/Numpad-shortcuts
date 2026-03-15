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
exports.handleNumpad0 = handleNumpad0;
const vscode = __importStar(require("vscode"));
const commandExecutor_1 = require("../commandExecutor");
/**
 * 小键盘0: 显示所有按键的功能
 */
async function handleNumpad0() {
    const config = (0, commandExecutor_1.getConfiguration)();
    const message = `
小键盘功能列表：
1 - ${getFunctionDescription(1, config.num1)}
2 - ${getFunctionDescription(2, config.num2)}
3 - ${getFunctionDescription(3, config.num3)}
4 - ${getFunctionDescription(4, config.num4)}
5 - ${getFunctionDescription(5, config.num5)}
6 - ${getFunctionDescription(6, config.num6)}
7 - ${getFunctionDescription(7, config.num7)}
8 - ${getFunctionDescription(8, config.num8)}
9 - ${getFunctionDescription(9, config.num9)}
0 - ${getFunctionDescription(0, config.num0)}
    `.trim();
    vscode.window.showInformationMessage(message, '确定');
}
function getFunctionDescription(num, command) {
    const builtinMap = {
        1: '运行当前文件',
        2: '删除当前文件（二次确认）',
        3: '重命名当前文件',
        4: '复制当前文件路径',
        5: '打开文件所在文件夹',
        6: '格式化当前文件',
        7: 'Git 提交当前文件',
        8: '创建新文件副本',
        9: '搜索当前文件内容',
        0: '显示所有按键的功能'
    };
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
    // 如果配置为空，使用默认值
    const effectiveCommand = command?.trim() || defaults[num];
    if (effectiveCommand.startsWith('builtin:')) {
        return builtinMap[num];
    }
    else {
        return `自定义命令: ${effectiveCommand}`;
    }
}
//# sourceMappingURL=numpad0.js.map