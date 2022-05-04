
import * as vscode from 'vscode';
import { showQuickPick, showInputBox } from './basicInput';
import { quickOpen } from './quickOpen';
import { multiStepInput } from './multiStepInput';


export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('samples.quickInput', async () => {
		const options: { [key: string]: (context: vscode.ExtensionContext) => Promise<void> } =
		{
			showInputBox,
			showQuickPick,
			quickOpen,
			multiStepInput
		};
		const quickPick = await vscode.window.createQuickPick();
		quickPick.items = Object.keys(options).map(label => ({ label }));
		quickPick.onDidChangeSelection((selection) => {
			console.log('selection', selection);
			if (selection[0]) {
				options[selection[0].label](context)
					.catch(console.error);
			}
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();
	}));
}

