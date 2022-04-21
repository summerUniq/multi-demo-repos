import React, { Component } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import {AttachAddon} from 'xterm-addon-attach'
import './terminal.css'
import 'xterm/css/xterm.css'

export default class CustomTerminal extends Component<unknown> {
    private terminalRef: HTMLDivElement | null = null
    private term: Terminal | null = null
    constructor(props: unknown) {
        super(props)
    }
    componentDidMount() {
        const term = new Terminal({
            cursorBlink: true,
            cursorStyle: 'underline',
            fontSize: 16,
        })
        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon)
        term.open(this.terminalRef as HTMLDivElement)
        fitAddon.fit();
        // term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
        term.writeln('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
        term.focus()
        this.term = term
        this.connectWs()


    }

    connectWs = (): void => {
        const path = `ws://localhost:8100/ws/exec/63fc0a70394f6eb117021b72dd339972b024ce501fd46ccb7189e887cf3fff21?cols=${this.term?.cols}&rows=${this.term?.rows}`
        const ws = new WebSocket(path)
        ws.onopen = () => {
            console.log('success');
            this.term?.loadAddon(new AttachAddon(ws))
        }
        ws.onerror = () => {
            console.log('error');   
        }
    }
    render() {
        return (
            <div className="terminal-container" ref={(ref) => this.terminalRef = ref} />
        )
    }
}
