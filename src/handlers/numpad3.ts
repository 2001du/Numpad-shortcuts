import * as vscode from 'vscode';
import { getCurrentFilePath, getFileName, getFileExtension, getFileDir } from '../utils';

/**
 * 小键盘3: 重命名当前文件
 */
export async function handleNumpad3() {
    const filePath = getCurrentFilePath();
    if (!filePath) {
        vscode.window.showWarningMessage('没有打开的文件');
        return;
    }

    const fileName = getFileName(filePath);
    const ext = getFileExtension(filePath);
    const baseName = fileName.substring(0, fileName.lastIndexOf('.'));

    const newName = await vscode.window.showInputBox({
        prompt: '输入新文件名',
        value: baseName,
        placeHolder: '新文件名'
    });

    if (newName && newName.trim() !== '') {
        const dirPath = getFileDir(filePath);
        const newPath = `${dirPath}/${newName}${ext}`;
        try {
            await vscode.workspace.fs.rename(vscode.Uri.file(filePath), vscode.Uri.file(newPath));
            vscode.window.showInformationMessage(`文件已重命名为: ${newName}${ext}`);
        } catch (error) {
            vscode.window.showErrorMessage(`重命名失败: ${error}`);
        }
    }
}
