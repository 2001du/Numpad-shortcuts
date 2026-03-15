import * as vscode from 'vscode';
import { getCurrentFilePath, getFileName } from '../utils';

/**
 * 小键盘2: 删除当前文件（带二次确认）
 */
export async function handleNumpad2() {
    const filePath = getCurrentFilePath();
    if (!filePath) {
        vscode.window.showWarningMessage('没有打开的文件');
        return;
    }

    const fileName = getFileName(filePath);
    const selection = await vscode.window.showWarningMessage(
        `确定要删除文件 "${fileName}" 吗？`,
        '确定删除',
        '取消'
    );

    if (selection === '确定删除') {
        try {
            await vscode.workspace.fs.delete(vscode.Uri.file(filePath));
            vscode.window.showInformationMessage(`文件 "${fileName}" 已删除`);
        } catch (error) {
            vscode.window.showErrorMessage(`删除失败: ${error}`);
        }
    }
}
