import { Component, Listenable, Listener } from "../../types/components";
import { Entity } from "../../types/Entity";
import { System } from "../../types/system";

class KeyboardListener implements Listenable {
    eventMap: Map<string, () => void>;
    system!: System<Listenable>;
    entity: number;
    visible: boolean = true;
    alive: boolean = true;
    engineTag: string="EVENTS";
    componentId?: number | undefined;
    constructor(entity: number, clickMap: {[key:string]:()=>void}) {
        this.entity = entity
        this.eventMap = new Map<string, ()=>{}>()
        
        Object.entries(clickMap).map(([k, v]) => {
            this.eventMap.set(k, v)
        })
    }
    copy<T>(listener: KeyboardListener): void {
        this.entity = listener.entity
        this.alive = listener.alive
        this.visible = listener.visible
        this.componentId = listener.componentId

    }
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        
    }

}