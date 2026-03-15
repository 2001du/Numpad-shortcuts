import * as vscode from 'vscode';
import { getCurrentFilePath, getFileExtension, getFileName } from '../utils';

/**
 * 小键盘1: 运行当前文件
 */
export async function handleNumpad1() {
    const filePath = getCurrentFilePath();
    if (!filePath) {
        vscode.window.showWarningMessage('没有打开的文件');
        return;
    }

    const ext = getFileExtension(filePath);
    let command = '';

    switch (ext) {
        case '.js':
            command = `node "${filePath}"`;
            break;
        case '.ts':
            command = `ts-node "${filePath}"`;
            break;
        case '.py':
            command = `python "${filePath}"`;
            break;
        case '.java':
            command = `javac "${filePath}" && java ${getFileName(filePath).replace('.java', '')}`;
            break;
        case '.cpp':
            command = `g++ "${filePath}" -o "${filePath.replace('.cpp', '')}" && "${filePath.replace('.cpp', '')}"`;
            break;
        case '.go':
            command = `go run "${filePath}"`;
            break;
        case '.rs':
            command = `rustc "${filePath}" -o "${filePath.replace('.rs', '')}" && "${filePath.replace('.rs', '')}"`;
            break;
        case '.php':
            command = `php "${filePath}"`;
            break;
        case '.rb':
            command = `ruby "${filePath}"`;
            break;
        case '.sh':
            command = `bash "${filePath}"`;
            break;
        default:
            vscode.window.showWarningMessage(`不支持的文件类型: ${ext}`);
            return;
    }

    const terminal = vscode.window.activeTerminal || vscode.window.createTerminal('Run File');
    terminal.show();
    terminal.sendText(command);
    vscode.window.showInformationMessage(`正在运行: ${getFileName(filePath)}`);
}
