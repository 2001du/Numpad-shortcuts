import * as vscode from 'vscode';
import { getCurrentFilePath, getFileName, getFileExtension, getFileDir } from '../utils';

/**
 * 小键盘8: 创建当前文件的副本
 */
export async function handleNumpad8() {
    const filePath = getCurrentFilePath();
    if (!filePath) {
        vscode.window.showWarningMessage('没有打开的文件');
        return;
    }

    const fileName = getFileName(filePath);
    const ext = getFileExtension(filePath);
    const baseName = fileName.substring(0, fileName.lastIndexOf('.'));

    const newName = await vscode.window.showInputBox({
        prompt: '输入副本文件名',
        value: `${baseName}_copy`,
        placeHolder: '副本文件名'
    });

    if (newName && newName.trim() !== '') {
        const dirPath = getFileDir(filePath);
        const newPath = `${dirPath}/${newName}${ext}`;
        try {
            const content = await vscode.workspace.fs.readFile(vscode.Uri.file(filePath));
            await vscode.workspace.fs.writeFile(vscode.Uri.file(newPath), content);
            vscode.window.showInformationMessage(`文件副本已创建: ${newName}${ext}`);
        } catch (error) {
            vscode.window.showErrorMessage(`创建副本失败: ${error}`);
        }
    }
}
