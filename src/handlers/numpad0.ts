import * as vscode from 'vscode';
import { getConfiguration } from '../commandExecutor';

/**
 * 小键盘0: 显示所有按键的功能
 */
export async function handleNumpad0() {
    const config = getConfiguration();
    const message = `
小键盘功能列表：
1 - ${getFunctionDescription(1, config.num1)}
2 - ${getFunctionDescription(2, config.num2)}
3 - ${getFunctionDescription(3, config.num3)}
4 - ${getFunctionDescription(4, config.num4)}
5 - ${getFunctionDescription(5, config.num5)}
6 - ${getFunctionDescription(6, config.num6)}
7 - ${getFunctionDescription(7, config.num7)}
8 - ${getFunctionDescription(8, config.num8)}
9 - ${getFunctionDescription(9, config.num9)}
0 - ${getFunctionDescription(0, config.num0)}
    `.trim();
    vscode.window.showInformationMessage(message, '确定');
}

function getFunctionDescription(num: number, command: string): string {
    const builtinMap: Record<number, string> = {
        1: '运行当前文件',
        2: '删除当前文件（二次确认）',
        3: '重命名当前文件',
        4: '复制当前文件路径',
        5: '打开文件所在文件夹',
        6: '格式化当前文件',
        7: 'Git 提交当前文件',
        8: '创建新文件副本',
        9: '搜索当前文件内容',
        0: '显示所有按键的功能'
    };

    const defaults: Record<number, string> = {
        0: 'builtin:show-functions',
        1: 'builtin:run-file',
        2: 'builtin:delete-file',
        3: 'builtin:rename-file',
        4: 'builtin:copy-path',
        5: 'builtin:open-folder',
        6: 'builtin:format-file',
        7: 'builtin:git-commit',
        8: 'builtin:copy-file',
        9: 'builtin:search-file',
    };

    // 如果配置为空，使用默认值
    const effectiveCommand = command?.trim() || defaults[num];

    if (effectiveCommand.startsWith('builtin:')) {
        return builtinMap[num];
    } else {
        return `自定义命令: ${effectiveCommand}`;
    }
}
