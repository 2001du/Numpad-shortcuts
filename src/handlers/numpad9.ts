import * as vscode from 'vscode';

/**
 * 小键盘9: 在当前文件中搜索
 */
export async function handleNumpad9() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('没有打开的文件');
        return;
    }

    await vscode.commands.executeCommand('actions.find');
}
