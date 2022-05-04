import {ExtensionContext, ViewColumn, WebviewPanel, window} from 'vscode';

let webviewPanel: WebviewPanel | undefined;

export function createWebview(
    _context: ExtensionContext,
    viewColumn: ViewColumn, 
    label:string
) {
    if(webviewPanel === undefined) {
        webviewPanel = window.createWebviewPanel('webview', label, viewColumn, {
            retainContextWhenHidden: true, // 控制是否保持webview面板的内容（iframe），即使面板不再可见。
            enableScripts: true //  下面的 html 页可以使用 Scripts
        });

        // 面板嵌入html
        webviewPanel.webview.html = getIframeHtml(label);
    }else {
        // 面板已经存在， 重新设置标题
        webviewPanel.title = label;
        // 需要通知webview更新label
        webviewPanel.webview.postMessage({
            type: 'update',
            payload: {label}
        });
        webviewPanel.reveal(); // Webview面板一次只能显示在一列中。如果它已经显示，则此方法将其移动到新列。
    }

    webviewPanel.onDidDispose(() => {
        webviewPanel = undefined;
    });

    return webviewPanel;
}

export function getIframeHtml(label:string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
            html,
            body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100%;
                height: 100%;
            }
            .iframeDiv {
                width: 100%;
                height: 100%;
            }
        </style>
        <script>
            window.addEventListener('message', (e) => {
                document.getElementById('iframe1').src = 'http://localhost:8000/#/'+e.data.payload.label+'/';
            })
        </script>
        </head>

        <body>
        <iframe id='iframe1' class="iframeDiv" src="http://localhost:3000/#/${label}" scrolling="auto"></iframe>
        </body>
    </html>
    `;
}