import { Component, Listenable } from "../../types/components.js";
import { Entity } from "../../types/Entity.js";
import { System } from "../../types/system.js";


export class MouseListener implements Listenable {
    entity: Entity;
    engineTag: string = "EVENTHANDLER";
    componentId?: number | undefined;
    eventMap: Map<string, ()=> void>
    constructor(entity: Entity, clickMap: {[key:string]:()=>void}) {
        this.entity = entity
        this.eventMap = new Map<string, ()=>{}>()
        
        Object.entries(clickMap).map(([k, v]) => {
            this.eventMap.set(k, v)
        })
    }
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        console.log("In mouse Listener")
    }
    
    
}