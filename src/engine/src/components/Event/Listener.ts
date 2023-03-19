import { EventHandler } from "../../systems/events/EventHandler.js";
import { Component, Listenable } from "../../types/components.js";
import { Entity } from "../../types/Entity.js";
import { System } from "../../types/system.js";


export class MouseListener implements Listenable {
    entity: number;
    engineTag: string = "EVENTHANDLER";
    componentId?: number | undefined;
    eventMap: Map<string, ()=> void>
    visible: boolean = true;
    alive: boolean = true;
    system!: EventHandler;
    constructor(entity: number, clickMap: {[key:string]:()=>void}) {
        this.entity = entity
        this.eventMap = new Map<string, ()=>{}>()
        
        Object.entries(clickMap).map(([k, v]) => {
            this.eventMap.set(k, v)
        })
    }
    copy<T>(listener: MouseListener): void {
        
        this.entity = listener.entity
        this.componentId = listener.componentId
        this.visible = listener.visible
        this.alive = listener.alive
    }
    
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        console.log("In mouse Listener")
    }
    toJSON() {
        
        return {
            entity: this.entity,
            engineTag: "EVENTHANDLER",
            componentId: this.componentId,
            onePunch: "Test"
        }
    }
    
    
}