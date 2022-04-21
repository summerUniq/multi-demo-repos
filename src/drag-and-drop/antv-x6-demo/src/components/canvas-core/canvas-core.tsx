import React, { useEffect } from 'react';
import { Graph } from '@antv/x6';
import { data } from 'components/canvas-core/data'


const CanvasCore: React.FC<unknown> = (

): React.ReactElement => {
  const createGraph = () => {
    return new Graph({
      container: document.getElementById('canvas-container') as HTMLDivElement,
      width: 800,
      height: 600,
      background: {
        color: '#fffbe6', // 设置画布背景颜色
      },
      grid: {
        size: 10,      // 网格大小 10px
        visible: true, // 渲染网格背景
      },
      panning: {
        enabled: true,
        modifiers: 'shift',
        // eventTypes: ['mouseWheel']
      }
    })
  }
  useEffect(() => {
    const graph = createGraph();
    const child = graph.addNode({
      x: 120,
      y: 80,
      width: 120,
      height: 60,
      zIndex: 10,
      label: 'Child\n(embedded)',
      attrs: {
        body: {
          fill: 'green',
        },
        label: {
          fill: '#fff',
        },
      },
    })

    const parent = graph.addNode({
      x: 80,
      y: 40,
      width: 320,
      height: 240,
      zIndex: 1,
      label: 'Parent\n(try to move me)',
    })

    parent.addChild(child)

  }, []);

  return <div id='canvas-container'>canvas container</div>;
}


export default CanvasCore