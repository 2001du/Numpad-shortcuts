import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Numpad Shortcuts extension is now active');

    // Register commands for numpad 0-9
    for (let i = 0; i <= 9; i++) {
        const disposable = vscode.commands.registerCommand(`numpad-shortcuts.num${i}`, () => {
            executeNumpadCommand(i);
        });
        context.subscriptions.push(disposable);
    }
}

function executeNumpadCommand(num: number) {
    const config = vscode.workspace.getConfiguration('numpad-shortcuts');
    const command = config.get<string>(`num${num}`);
    
    if (!command || command.trim() === '') {
        vscode.window.showWarningMessage(`Numpad ${num} is not configured. Please set it in Settings → Extensions → Numpad Shortcuts`);
        return;
    }

    const terminal = vscode.window.activeTerminal || vscode.window.createTerminal('Numpad Shortcut');
    terminal.show();
    terminal.sendText(command);
    
    vscode.window.showInformationMessage(`Executed: ${command}`);
}

export function deactivate() {}
