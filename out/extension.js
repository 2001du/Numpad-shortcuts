"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    console.log('Numpad Shortcuts extension is now active');
    // Register commands for numpad 0-9
    for (let i = 0; i <= 9; i++) {
        const disposable = vscode.commands.registerCommand(`numpad-shortcuts.num${i}`, () => {
            executeNumpadCommand(i);
        });
        context.subscriptions.push(disposable);
    }
}
function executeNumpadCommand(num) {
    const config = vscode.workspace.getConfiguration('numpad-shortcuts');
    const command = config.get(`num${num}`);
    if (!command || command.trim() === '') {
        vscode.window.showWarningMessage(`Numpad ${num} is not configured. Please set it in Settings → Extensions → Numpad Shortcuts`);
        return;
    }
    const terminal = vscode.window.activeTerminal || vscode.window.createTerminal('Numpad Shortcut');
    terminal.show();
    terminal.sendText(command);
    vscode.window.showInformationMessage(`Executed: ${command}`);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map