import * as vscode from 'vscode';

/**
 * 小键盘6: 格式化当前文件
 */
export async function handleNumpad6() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('没有打开的文件');
        return;
    }

    try {
        await vscode.commands.executeCommand('editor.action.formatDocument');
        vscode.window.showInformationMessage('文件已格式化');
    } catch (error) {
        vscode.window.showErrorMessage(`格式化失败: ${error}`);
    }
}
