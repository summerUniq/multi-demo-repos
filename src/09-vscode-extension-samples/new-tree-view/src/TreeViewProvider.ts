import { TreeDataProvider, TreeItemCollapsibleState, window, TreeItem, Uri, Command, ThemeIcon, ProviderResult } from 'vscode';
import { join } from 'path';

const ITEM_ICON_MAP = new Map<string, string>([
    ["cat", "cat.svg" ],
    ["dog", "dog.svg"],
    ["pig", "pig.svg"]
]);

export class TreeItemNode extends TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
    }

    command = {
        title: this.label,
        command: "itemClick", // command id
        tooltip: this.label, 
        arguments: [ // 向 registerCommand 传递的参数
            this.label
        ]
    };

    iconPath?: string | Uri | { light: string | Uri; dark: string | Uri; } | ThemeIcon | undefined
     = TreeItemNode.getIconUrlForLabel(this.label)

    static getIconUrlForLabel(label: string): Uri {
        return Uri.file(join(__filename, '..', '..', 'src', 'assets', ITEM_ICON_MAP.get(label)+''));
    }
}

export class CustomTreeDataProvider implements TreeDataProvider<TreeItemNode> {
    getTreeItem(element: TreeItemNode): TreeItem | Thenable<TreeItem> {
        return element;
    }
    getChildren(element?: TreeItemNode): ProviderResult<TreeItemNode[]> {
        // 给每一项都创建一个TreeItemNode
        return ["cat", "dog", "pig"].map(item => (
            new TreeItemNode(item, TreeItemCollapsibleState.None)
            )
        );
    }

    public static initTreeViewItem() {
        // 实例化
        const treeDataProvider = new CustomTreeDataProvider();
        // 注册树视图
        window.registerTreeDataProvider('animalTreeViewItem', treeDataProvider);
    }
}