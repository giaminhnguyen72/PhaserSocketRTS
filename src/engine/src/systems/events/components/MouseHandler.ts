import { EngineType } from "../../../constants/engineType.js";
import { Engine } from "../../../core/engine.js";
import { EventHandler } from "../EventHandler.js";
import { Component, Emitter, EngineEvent, Listenable, Listener } from "../../../types/components.js";
import { Position } from "../../../types/components/physics/transformType.js";
import { Entity } from "../../../types/Entity.js";
import { EventSystem, System } from "../../../types/system.js";
import { UIListener } from "./UIListener.js";


export class MouseListener implements Listener<ClickEvent> {
    entity!: number;
    engineTag: string = "EVENTHANDLER";
    componentId?: number | undefined;
    events: Map<string, (click: ClickEvent)=> void>
    visible: boolean = true;
    alive: boolean = true;
    system!: EventHandler;

    
    constructor(clickMap: {[key:string]:(click: ClickEvent)=>void}) {
        
        this.events = new Map<string, ()=>{}>()
        
        Object.entries(clickMap).map(([k, v]) => {
            this.events.set(k, v)
        })
    }
    execute(event: ClickEvent): void {
        let event1: ClickEvent = event
        
        let func = this.events.get(event.eventName)
        if (func) {
            func(event)
        }
    }
    getEventType(): string {
        return "MOUSE"
    }
    copy<T>(listener: MouseListener): void {
        
        this.entity = listener.entity
        this.componentId = listener.componentId
        this.visible = listener.visible
        this.alive = listener.alive
    }
    initialize(system: EventSystem<ClickEvent>): void {
        system.registerListener(this)
        
    }
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        console.log("In mouse Listener")
    }
    toJSON() {
        
        return {
            entity: this.entity,
            engineTag: "EVENTHANDLER",
            componentId: this.componentId,
            visible: this.visible,
            alive: this.alive
        }
    }
    getEvents(): Map<string, (valie:ClickEvent) => void> {
        return this.events
    }
    
    
}
export class MouseEmitter implements Emitter<ClickEvent> {
    listeners: Map<number, Listener<ClickEvent>> = new Map()
    events: ClickEvent[] = []
    entity?: number | undefined;
    visible: boolean = true;
    alive: boolean = true;
    engineTag: string = "EVENTHANDLER";
    componentId?: number | undefined;
    system!: System<Component>;
    engineType:EngineType 
    maxInput: number = 10
    constructor(engine: EngineType) {
        this.engineType = engine
    }
    initialize(system: EventSystem<ClickEvent>): void {
        system.registerEmitter(this)
        if (this.engineType != EngineType.SOCKETSERVER) {
            const canvas = document.querySelector('canvas')
            if (canvas) {
                window.addEventListener("click", (event) => {
                    let rect = canvas.getBoundingClientRect()
                    let x = event.x / rect.width * canvas.width
                    let y = event.y / rect.height * canvas.height
                    if (this.events.length > this.maxInput) {
                        this.events.shift()
                    }
                    this.events.push({
                        pos: {x: x , y: y , z: 0},
                        eventName: "click"
                    })
                })
                window.addEventListener("dblclick", (event) => {
                    if (this.events.length > this.maxInput) {
                        this.events.shift()
                    }
                    this.events.push({
                        pos: {x: event.x, y:event.y, z: 0},
                        eventName: "dblclick"
                    })
                })
            }
            
        }
    }
    addListener(component: Listener<ClickEvent>): void {
        this.listeners.set(component.componentId as number, component)
    }
    emit(event: ClickEvent): void {
        for (let listener of this.listeners) {
            listener[1].execute(event)
        }
    }
    removeListener(id: number): void {
        this.listeners.delete(id)
        
    }
    getListeners() {
        return []
    }
    getEventType(): string {
        return "MOUSE"
    }
    
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        for (let i = this.events.length - 1; i >= 0; i--) {
            this.emit(this.events[i])
            this.events.pop()
        }
    }
    copy(component: Component): void {
        this.alive = component.alive
        this.visible = component.alive
    }
    toJSON() {
        return {
            visible: this.visible,
            alive:  this.alive
        }
    }

}
export class MouseEmitter3d implements Emitter<ClickEvent> {
    listeners: Map<number, Listener<ClickEvent>> = new Map()
    UIListener: Map<number, UIListener> = new Map()
    events: ClickEvent[] = []
    entity?: number | undefined;
    visible: boolean = true;
    alive: boolean = true;
    engineTag: string = "EVENTHANDLER";
    componentId?: number | undefined;
    system!: System<Component>;
    engineType:EngineType 
    maxInput: number = 1
    
    constructor(engine: EngineType) {
        this.engineType = engine
    }
    initialize(system: EventSystem<ClickEvent>): void {
        system.registerEmitter(this)
        if (this.engineType != EngineType.SOCKETSERVER) {
            const canvas = document.querySelector('canvas')
            if (canvas) {
                window.addEventListener("click", (event) => {
                    let rect = canvas.getBoundingClientRect()
                    let x = event.x / rect.width * canvas.width
                    let y = event.y / rect.height * canvas.height
                    if (this.events.length > this.maxInput) {
                        this.events.shift()
                    }
                    this.events.push({
                        pos: {x: event.clientX , y: event.clientY , z: 0},
                        eventName: "click"
                    })
                })
                window.addEventListener("dblclick", (event) => {
                    if (this.events.length > this.maxInput) {
                        this.events.shift()
                    }
                    this.events.push({
                        pos: {x: event.x, y:event.y, z: 0},
                        eventName: "dblclick"
                    })
                })
            }
            
        }
    }
    addListener(component: Listener<ClickEvent>): void {

        if (component instanceof UIListener) {
            
            this.UIListener.set(component.componentId as number, component)
        } else {
            
            this.listeners.set(component.componentId as number, component)
        }
    }
    emit(event: ClickEvent): void {
        for (let listener of this.listeners) {
            listener[1].execute(event)
        }
    }
    removeListener(id: number): void {
        this.listeners.delete(id)
        this.UIListener.delete(id)
    }
    getListeners() {
        return []
    }
    getEventType(): string {
        return "MOUSE"
    }
    
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        
        for (let i = this.events.length - 1; i >= 0; i--) {
            let clicked = false

            for (let listener of this.UIListener) {
                clicked = clicked || listener[1].isClicked(this.events[i])

            }
            if (!clicked) {
                this.emit(this.events[i])
            }
            
            this.events.pop()
        }
    }
    copy(component: Component): void {
        this.alive = component.alive
        this.visible = component.alive
    }
    toJSON() {
        return {
            visible: this.visible,
            alive:  this.alive
        }
    }

}
interface ClickEvent extends EngineEvent{
    pos: Position
    eventName: string
}