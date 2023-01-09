import io from 'socket.io-client'

export default class WaitingRoom  {
    constructor() {
        
    }  
    preload() {

    }
    create() {
        const url = "https://localhost:5000/play"
        let socket = io()
        socket.on('connect', () => {
            console.log('You are now connnected')
        })
        socket.on('reconnect_attempt', () => {
            socket.io.opts.transports = ['polling', 'websocket']
        })
    }
}