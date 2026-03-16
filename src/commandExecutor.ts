import * as vscode from 'vscode';
import { replaceVariables } from './utils';
import * as numpad1 from './handlers/numpad1';
import * as numpad2 from './handlers/numpad2';
import * as numpad3 from './handlers/numpad3';
import * as numpad4 from './handlers/numpad4';
import * as numpad5 from './handlers/numpad5';
import * as numpad6 from './handlers/numpad6';
import * as numpad7 from './handlers/numpad7';
import * as numpad8 from './handlers/numpad8';
import * as numpad9 from './handlers/numpad9';
import * as numpad0 from './handlers/numpad0';

/**
 * 配置接口
 */
export interface NumpadConfig {
    num0: string;
    num1: string;
    num2: string;
    num3: string;
    num4: string;
    num5: string;
    num6: string;
    num7: string;
    num8: string;
    num9: string;
}

/**
 * 内置功能处理器映射
 */
const builtinHandlers: Record<string, () => Promise<void>> = {
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
export function getConfiguration(): NumpadConfig {
    const config = vscode.workspace.getConfiguration('numpad-shortcuts');
    return {
        num0: config.get<string>('num0', 'builtin:show-functions'),
        num1: config.get<string>('num1', 'builtin:run-file'),
        num2: config.get<string>('num2', 'builtin:delete-file'),
        num3: config.get<string>('num3', 'builtin:rename-file'),
        num4: config.get<string>('num4', 'builtin:copy-path'),
        num5: config.get<string>('num5', 'builtin:open-folder'),
        num6: config.get<string>('num6', 'builtin:format-file'),
        num7: config.get<string>('num7', 'builtin:git-commit'),
        num8: config.get<string>('num8', 'builtin:copy-file'),
        num9: config.get<string>('num9', 'builtin:search-file'),
    };
}

/**
 * 执行小键盘命令
 */
export async function executeNumpadCommand(num: number) {
    const config = getConfiguration();
    let command = config[`num${num}` as keyof NumpadConfig];

    // 如果命令为空，使用默认内置功能
    if (!command || command.trim() === '') {
        const defaults: Record<number, string> = {
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
            } catch (error) {
                vscode.window.showErrorMessage(`执行内置功能失败: ${error}`);
            }
        } else {
            vscode.window.showErrorMessage(`未知的内置功能: ${command}`);
        }
    } else {
        // 执行自定义命令
        try {
            const expandedCommand = replaceVariables(command);
            const terminal = vscode.window.activeTerminal || vscode.window.createTerminal('Numpad Shortcut');
            terminal.show();
            terminal.sendText(expandedCommand);
            vscode.window.showInformationMessage(`已执行: ${expandedCommand}`);
        } catch (error) {
            vscode.window.showErrorMessage(`执行命令失败: ${error}`);
        }
    }
}
