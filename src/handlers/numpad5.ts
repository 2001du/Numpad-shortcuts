import * as vscode from 'vscode';
import { getCurrentFilePath, getFileDir } from '../utils';

/**
 * 小键盘5: 打开文件所在文件夹
 */
export async function handleNumpad5() {
    const filePath = getCurrentFilePath();
    if (!filePath) {
        vscode.window.showWarningMessage('没有打开的文件');
        return;
    }

    const folderPath = getFileDir(filePath);
    const uri = vscode.Uri.file(folderPath);

    // 检查文件夹是否已在工作区中
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
    if (workspaceFolder) {
        await vscode.commands.executeCommand('revealInExplorer', uri);
    } else {
        await vscode.commands.executeCommand('vscode.openFolder', uri, { forceNewWindow: false });
    }

    vscode.window.showInformationMessage(`已打开文件夹: ${folderPath}`);
}
