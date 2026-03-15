import * as vscode from 'vscode';
import { getCurrentFilePath, getFileName } from '../utils';

/**
 * 小键盘7: Git 提交当前文件
 */
export async function handleNumpad7() {
    const filePath = getCurrentFilePath();
    if (!filePath) {
        vscode.window.showWarningMessage('没有打开的文件');
        return;
    }

    const fileName = getFileName(filePath);
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
