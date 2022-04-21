import * as vscode from 'vscode';
const quickPickList = ['eins', 'zwei', 'drei'];
const placeHolder = `eins, zwei or drei`;

/**
 * Shows a pick list using window.showQuickPick().
 */
export async function showQuickPick() {
    let i = 0;
    const result = await vscode.window.showQuickPick(quickPickList, {
        placeHolder,
        onDidSelectItem: (item) => {
            vscode.window.showInformationMessage(
                `Focus ${++i}: ${item}`
            );
        }
    });
    vscode.window.showInformationMessage(`Got: ${result}`);
}

/**
 * Shows an input box using window.showInputBox().
 */
export async function showInputBox() {
    const result = await vscode.window.showInputBox({
        value: 'abcdef',
        valueSelection: [2, 4],
        placeHolder: 'For example: fedcba. But not: 123',
        validateInput: (text) => {
            vscode.window.showInformationMessage(`Validating: ${text}`);
            return text === '123' ? 'Not 123!' : null;
        }
    });
    vscode.window.showInformationMessage(`Got: ${result}`);
}