import {
	CancellationToken,
	Disposable, ExtensionContext, QuickInput, QuickInputButton, QuickInputButtons,
	QuickPickItem, Uri, window
} from 'vscode';

/**
 * A multi-step input using window.createQuickPick() and window.createInputBox().
 * 
 * This first part uses the helper class `MultiStepInput` that wraps the API for the multi-step case.
 */
export async function multiStepInput(context: ExtensionContext) {
	const title = 'Create Application Service';

	const resourceGroup: QuickPickItem[] = [
		'vscode-data-function',
		'vscode-appservice-microservices',
		'vscode-appservice-monitor',
		'vscode-appservice-preview',
		'vscode-appservice-prod'
	].map(label => ({ label }));

	class MyButton implements QuickInputButton {
		constructor(public iconPath: { light: Uri, dark: Uri }, public tooltip: string) { }
	}

	const createResourceGroupButton = new MyButton({
		dark: Uri.file(context.asAbsolutePath('resource/dark/add.svg')),
		light: Uri.file(context.asAbsolutePath('resources/light/add.svg'))
	}, 'Create Resource Group');

	interface State {
		title: string;
		step: number;
		totalSteps: number;
		resourceGroup: QuickPickItem | string;
		name: string;
		runtime: QuickPickItem;
	}

	async function collectInputs() {
		const state = {} as Partial<State>;
		await MultiStepInput.run((input) => pickResourceGroup(input, state));
		return state as State;
	}

	async function pickResourceGroup(input: MultiStepInput, state: Partial<State>) {
		const pick = await input.showQuickPick({
			title,
			step: 1,
			totalSteps: 3,
			placeholder: 'Pick a resource group',
			items: resourceGroup,
			activeItem: typeof state.resourceGroup !== 'string' ? state.resourceGroup : undefined,
			buttons: [createResourceGroupButton],
			shouldResume: shouldResume
		});
		console.log('pick', pick instanceof MyButton);
		if (pick instanceof MyButton) {
			return (input: MultiStepInput) => inputResourceGroupName(input, state);
		}
		state.resourceGroup = pick;
		return (input: MultiStepInput) => inputName(input, state);
	}

	function shouldResume() {
		return new Promise<boolean>((resolve, reject) => {
			// noop
		});
	}

	async function inputResourceGroupName(input: MultiStepInput, state: Partial<State>) {
		state.resourceGroup = await input.showInputBox({
			title,
			step: 2,
			totalSteps: 4,
			value: typeof state.resourceGroup === 'string' ? state.resourceGroup : '',
			prompt: 'Choose a unique name for the resource group',
			validate: validateNameIsUnique,
			shouldResume: shouldResume
		});
		return (input: MultiStepInput) => inputName(input, state);
	}

	async function inputName(input: MultiStepInput, state: Partial<State>) {
		const additionalSteps = typeof state.resourceGroup === 'string' ? 1 : 0;
		state.name = await input.showInputBox({
			title,
			step: 2 + additionalSteps,
			totalSteps: 3 + additionalSteps,
			value: state.name || '',
			prompt: 'Choose a unique name for the Application Service',
			validate: validateNameIsUnique,
			shouldResume: shouldResume
		});
		return (input: MultiStepInput) => pickRuntime(input, state);
	}

	async function validateNameIsUnique(name: string) {
		await new Promise(resolve => setTimeout(resolve, 1000));
		return name == 'vscode' ? 'Name not unique' : undefined;
	}

	async function pickRuntime(input: MultiStepInput, state: Partial<State>) {
		const additionalSteps = typeof state.resourceGroup === 'string' ? 1 : 0;
		const runtimes = await getAvailableRuntimes(state.resourceGroup!, undefined);
		state.runtime = await input.showQuickPick({
			title,
			step: 3 + additionalSteps,
			totalSteps: 3 + additionalSteps,
			placeholder: 'Pick a runtime',
			items: runtimes,
			activeItem: state.runtime,
			shouldResume: shouldResume
		});
	}

	async function getAvailableRuntimes(resourceGroup: QuickPickItem | string,
		token?: CancellationToken): Promise<QuickPickItem[]> {
		await new Promise(resolve => setTimeout(resolve, 1000));
		return ['Node 8.9', 'Node 6.11', 'Node 4.5'].map(label => ({ label }));
	}


	const state = await collectInputs();
	window.showInformationMessage(`Creating Application Service '${state.name}'`);
}

// Helper code that wraps the API for the multi-step case.

type InputStep = (input: MultiStepInput) => Thenable<InputStep | void>

class InputFlowAction {
	static back = new InputFlowAction();
	static cancel = new InputFlowAction();
	static resume = new InputFlowAction();
}

interface QuickPickParameters<T extends QuickPickItem> {
	title: string;
	step: number;
	totalSteps: number;
	items: T[];
	activeItem?: T;
	placeholder: string;
	buttons?: QuickInputButton[];
	shouldResume: () => Thenable<boolean>;
}

interface InputBoxParameters {
	title: string;
	step: number;
	totalSteps: number;
	value: string;
	prompt: string;
	validate: (value: string) => Promise<string | undefined>,
	buttons?: QuickInputButton[];
	shouldResume: () => Thenable<boolean>;
}

class MultiStepInput {
	static async run<T>(start: InputStep) {
		const input = new MultiStepInput();
		return await input.stepThrough(start);
	}

	private current?: QuickInput;
	private steps: InputStep[] = [];

	private async stepThrough<T>(start: InputStep) {
		let step: InputStep | void = start;
		while (step) {
			this.steps.push(step);
			if (this.current) {
				this.current.enabled = false;
				this.current.busy = true;
			}
			try {
				step = await step(this);
			} catch (err) {
				if (err === InputFlowAction.back) {
					this.steps.pop();
					step = this.steps.pop();
				} else if (err === InputFlowAction.resume) {
					step = this.steps.pop();
				} else if (err === InputFlowAction.cancel) {
					step = undefined;
				} else {
					throw err;
				}
			}
		}
		if (this.current) {
			this.current.dispose();
		}
	}

	async showQuickPick<T extends QuickPickItem, P extends QuickPickParameters<T>>({
		title,
		step,
		totalSteps,
		items,
		activeItem,
		placeholder,
		buttons,
		shouldResume
	}: P) {
		const disposables: Disposable[] = [];
		try {
			return await new Promise<T | (P extends { buttons: (infer I)[] } ? I : never)>((resolve, reject) => {
				const input = window.createQuickPick<T>();
				input.title = title;
				input.placeholder = placeholder;
				input.step = step;
				input.totalSteps = totalSteps;
				input.items = items;
				if (activeItem) {
					input.activeItems = [activeItem];
				}
				input.buttons = [
					...(this.steps.length > 1 ? [QuickInputButtons.Back] : []),
					...(buttons || []),
				];
				disposables.push(
					input.onDidTriggerButton(item => {
						if (item === QuickInputButtons.Back) {
							reject(InputFlowAction.back);
						} else {
							resolve(<any>item);
						}
					}),
					input.onDidChangeSelection(items => resolve(items[0])),
					input.onDidHide(() => {
						(async () => {
							reject(shouldResume && await shouldResume() ? InputFlowAction.resume : InputFlowAction.cancel);
						})()
							.catch(reject);
					})
				);
				if (this.current) {
					this.current.dispose();
				}
				this.current = input;
				this.current.show();
			});
		} finally {
			disposables.map(d => d.dispose());
		}
	}

	async showInputBox<P extends InputBoxParameters>({
		title,
		step,
		totalSteps,
		value,
		validate,
		prompt,
		buttons,
		shouldResume
	}: P) {
		const disposables: Disposable[] = [];
		try {
			return await new Promise<string | (P extends { buttons: (infer I)[] } ? I : never)>((resolve, reject) => {
				const input = window.createInputBox();
				input.title = title;
				input.step = step;
				input.totalSteps = totalSteps;
				input.value = value;
				input.prompt = prompt;
				input.buttons = [
					...(this.steps.length > 1 ? [QuickInputButtons.Back] : []),
					...(buttons || [])
				];
				let validating = validate('');
				disposables.push(
					input.onDidTriggerButton((item) => {
						console.log('createInputBox item>>> ', item);
						if (item === QuickInputButtons.Back) {
							reject(InputFlowAction.back);
						} else {
							resolve(<any>item);
						}
					}),
					input.onDidAccept(async () => {
						const value = input.value;
						input.enabled = false;
						input.busy = true;
						if (!(await validate(value))) {
							resolve(value);
						}
						input.enabled = true;
						input.busy = false;
					}),
					input.onDidChangeValue(async (text) => {
						const current = validate(text);
						validating = current;
						const validateMessage = await current;
						console.log('validating', validating);
						console.log('current', current);
						// TODO:????
						if (current === validating) {
							input.validationMessage = validateMessage;
						}
					}),
					input.onDidHide(() => {
						(async () => {
							reject(shouldResume && await shouldResume() ? InputFlowAction.resume : InputFlowAction.cancel);
						})()
							.catch(reject);
					})
				);
				if (this.current) {
					this.current.dispose();
				}
				this.current = input;
				this.current.show();
			});
		} finally {
			disposables.map(d => d.dispose());
		}
	}
}

