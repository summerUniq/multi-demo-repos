// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import {CustomTreeDataProvider} from './TreeViewProvider';

import {createWebview} from './webview';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "new-tree-view" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('new-tree-view.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from new-tree-view!');
	});

	context.subscriptions.push(disposable);

	// 实例树视图的初始化
	CustomTreeDataProvider.initTreeViewItem();

	// 注册CustomTreeDataProvider里面的command
	context.subscriptions.push(vscode.commands.registerCommand('itemClick', (label) => {
		// 显示webview
		const webview = createWebview(context, vscode.ViewColumn.Active, label);
		context.subscriptions.push(webview);
	}));


}

// this method is called when your extension is deactivated
export function deactivate() {}
