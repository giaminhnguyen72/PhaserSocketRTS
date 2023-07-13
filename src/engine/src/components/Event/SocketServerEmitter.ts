
import { EngineType } from "../../constants/engineType.js";
import { SocketManager } from "../../core/managers/SocketManager.js";
import { Component, Emitter, EngineEvent, Listener } from "../../types/components.js";
import { EventSystem, System } from "../../types/system.js";

export class SocketClient implements Emitter<SocketEvent>, Listener<SocketEvent> {

    emissionQueue: SocketEvent[] = []
    listenQueue: Map<string, SocketEvent>= new Map()
    listenerLock: boolean = false
    socketMap: {[key:string]:(data: any)=>void}
    events: Map<string, (data: any) => void>;
    //{[key:string]:{[event:string]:(click: SocketEvent)=>void}}
    entity?: number | undefined;
    visible: boolean = true;
    alive: boolean = true;
    engineTag: string = "EVENTHANDLER";
    componentId?: number | undefined;
    system!: System<Component>;
    engineType: EngineType
    constructor(socketMap: {[key:string]:(data: any)=>void}, engineType: EngineType) {
        this.socketMap = socketMap
        this.engineType = engineType
        this.events = new Map()
    

    }
    
    initialize(system: EventSystem): void {
        system.registerEmitter(this)
        system.registerListener(this)
        Object.entries(this.socketMap).map(([k, v]) => {
            this.events.set(k, v)
            SocketManager.socket.on(k, (data: any) => {
                let func = this.events.get(k)
                if (func && !this.listenerLock) {
                    this.listenQueue.set(k, {
                        event: k,
                        data: data
                    })
                }
            })
        })
        

        
        
    }
    addListener(component: Listener<SocketEvent>): void {
        let events = component.getEvents()
        for (let event of events) {
            SocketManager.socket.on(event[0],event[1])
        }
    }

    emit(event: SocketEvent): void {
        SocketManager.socket.emit(event.event, event.data)
    }
    
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        
        for (let i = this.emissionQueue.length - 1; i >= 0; i--) {
            this.emit(this.emissionQueue[i])
            this.emissionQueue.pop()
        }
        this.listenerLock = true
        for (let i of this.listenQueue) {
            
            
            
            let func = this.events.get(i[0]) 
            if (func) {
                func(i[1].data)
            } else {
                throw new Error()
            }
            
        }
        this.listenQueue.clear()
        this.listenerLock = false
    }
    queueEvent(event: SocketEvent) {
        this.emissionQueue.push(event)
    }
    copy(component: SocketClient): void {
        this.visible = component.visible
        this.alive = component.alive
        this.engineType = component.engineType
    }
    getEventType(): string {
        return "SocketServer"
    }
    //Listener portion

    execute(event: SocketEvent): void {
        if (event) {
            let func = this.events.get(event.event) 
            if (func) {
                func(event.data)
            }
        }
    }
    getEvents(): Map<string, (evnt: SocketEvent)=> void> {
        let map = new Map()
        Object.entries(this.socketMap).map(([k, v]) => {
            map.set(k, v)
        })
        return map
    }
    toJSON() {
        let engineType = this.engineType == EngineType.SOCKETCLIENT ? EngineType.SOCKETSERVER : EngineType.SOCKETCLIENT
        
        return {
            visible: this.visible,
            alive: this.alive,
            engineType: engineType
        }
    }

}



interface SocketEvent extends EngineEvent {
    event: string
    data: any
}