# 纯CSS实现左右拖拽改变布局大小

核心代码
css

```css
 .column {
            overflow: hidden;
        }

        .column-left {
            height: 400px;
            background-color: pink;
            float: left;
            position: relative;
        }

        .column-right {
            height: 400px;
            background-color: #eee;
            padding: 16px;
            box-sizing: border-box;
            overflow: hidden;
        }

        .resize-save {
            position: absolute;
            top: 0;
            right: 5px;
            bottom: 0;
            left: 0;
            padding: 16px;
            overflow-x: hidden;
        }

        .resize-bar {
            width: 200px;
            height: inherit;
            /* 设置resize属性及resize方向 */
            resize: horizontal;
            /* 设置滚动条 */
            overflow: scroll;
            /* 设置鼠标样式 */
            cursor: ew-resize;
            /* 右下角不显示resize bar */
            opacity: 0;
        }

        .resize-line {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            border-right: 2px solid black;
            border-left: 1px solid #ddd;
            pointer-events: none;
        }

        .resize-bar:hover~.resize-line,
        .resize-bar:active~.resize-line {
            border-left: 1px dashed skyblue;
        }

        .resize-bar::-webkit-scrollbar {
            width: 200px;
            height: inherit;
        }

        /* 在firefox浏览器中会有问题，resize区域很小 */
        @supports (-moz-user-select: none) {

            .resize-bar:hover~.resize-line,
            .resize-bar:active~.resize-line {
                border-left: 1px solid #bbb;
            }

            .resize-bar:hover~.resize-line::after,
            .resize-bar:active~.resize-line::after {
                content: '';
                position: absolute;
                width: 16px;
                height: 16px;
                bottom: 0;
                right: -8px;
            }
        }
```

html

```html
<div class="column">
        <div class="column-left">
            <div class="resize-bar"></div>
            <div class="resize-line"></div>
            <div class="resize-save">
                左侧的内容，左侧的内容，左侧的内容，左侧的内容
            </div>
        </div>
        <div class="column-right">
            右侧的内容，右侧的内容，右侧的内容，右侧的内容
        </div>
    </div>
```
