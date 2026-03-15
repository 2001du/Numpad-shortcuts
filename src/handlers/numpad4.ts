import * as vscode from 'vscode';
import { getCurrentFilePath } from '../utils';

/**
 * 小键盘4: 复制当前文件路径到剪贴板
 */
export async function handleNumpad4() {
    const filePath = getCurrentFilePath();
    if (!filePath) {
        vscode.window.showWarningMessage('没有打开的文件');
        return;
    }

    await vscode.env.clipboard.writeText(filePath);
    vscode.window.showInformationMessage(`文件路径已复制: ${filePath}`);
}
