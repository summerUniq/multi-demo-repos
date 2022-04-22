import React, { Component } from 'react'
import { Graph, Addon } from '@antv/x6'
import './drag-dnd.css'

export default class DndDrag extends Component<unknown> {

    private graph!: Graph
    private container!: HTMLDivElement
    // private dnd: any
    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            grid: true,
        })
        const source = graph.addNode({
            x: 130,
            y: 30,
            width: 100,
            height: 40,
            attrs: {
                label: {
                    text: 'Hello',
                    fill: '#6a6c8a',
                },
                body: {
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                },
            },
        })
        const target = graph.addNode({
            x: 180,
            y: 160,
            width: 100,
            height: 40,
            attrs: {
                label: {
                    text: 'World',
                    fill: '#6a6c8a',
                },
                body: {
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                },
            },
        })
        graph.addEdge({ source, target })
        this.graph = graph
    }

    private refContainer = (ref: HTMLDivElement) => {
        this.container = ref
    }
    render() {
        return (
            <div className='dnd-app'>
                <div className='dnd-wrap'>
                    <div
                        data-type="rect"
                        className="dnd-rect"
                    >
                        Rect
                    </div>
                    <div
                        data-type="circle"
                        className="dnd-circle"
                    >
                        Circle
                    </div>
                </div>
                <div className='app-content' ref={this.refContainer}></div>
            </div>
        )
    }
}
