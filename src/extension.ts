import * as vscode from 'vscode';
import { executeNumpadCommand } from './commandExecutor';

/**
 * 插件激活函数
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('Numpad Shortcuts extension is now active');

    // 注册小键盘 0-9 的命令
    for (let i = 0; i <= 9; i++) {
        const disposable = vscode.commands.registerCommand(`numpad-shortcuts.num${i}`, () => {
            executeNumpadCommand(i);
        });
        context.subscriptions.push(disposable);
    }
}

/**
 * 插件停用函数
 */
export function deactivate() { }
