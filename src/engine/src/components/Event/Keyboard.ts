import { Component, Listenable } from "../../types/components";
import { Entity } from "../../types/Entity";
import { System } from "../../types/system";

class KeyboardListener implements Listenable {
    eventMap: Map<string, () => void>;
    system!: System<Component>;
    entity?: Entity | undefined;
    visible: boolean = true;
    alive: boolean = true;
    engineTag: string="EVENTS";
    componentId?: number | undefined;
    constructor(entity: Entity, clickMap: {[key:string]:()=>void}) {
        this.entity = entity
        this.eventMap = new Map<string, ()=>{}>()
        
        Object.entries(clickMap).map(([k, v]) => {
            this.eventMap.set(k, v)
        })
    }
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        
    }

}