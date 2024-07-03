import { EngineType } from "../../../constants/engineType.js";
import { Engine } from "../../../core/engine.js";
import { EventHandler } from "../EventHandler.js";
import { Component, Emitter, EngineEvent, Listenable, Listener } from "../../../types/components.js";
import { Position, Vector3 } from "../../../types/components/physics/transformType.js";
import { Entity } from "../../../types/Entity.js";
import { EventSystem, System } from "../../../types/system.js";
import { Rectangle } from "../../../../../engine/src/types/components/collision/shape.js";

export class UIListener implements Listener<MouseEvent>{
    entity?: number | undefined;
    visible: boolean = true;
    alive: boolean = true;
    engineTag: string =  "EVENTHANDLER";
    componentId?: number | undefined;
    system!: System<Component>;
    boundingBox: Rectangle
    children: UIListener[] = []
    onClick?: (ev:MouseEvent) => void
    offset: [number,number] = [0,0]
    constructor(rectangle: Rectangle,callback?: (ev: MouseEvent) => void, ...children: UIListener[]) {
        this.boundingBox = rectangle
        this.onClick = callback
        this.children = children
    }
    
    initialize(system: EventSystem<MouseEvent>): void {
        this.system = system
        system.registerListener(this)

    }

    execute(event: MouseEvent): void {

        if ((this.onClick)) {
            this.onClick(event)
        }

        
    }
    isClicked(event: MouseEvent, parent?: UIListener): boolean {
        let x = (event.clientX / (window.innerWidth)) * 2 -1
        let y = (event.clientY / (window.innerHeight)) * -2 + 1
        let minX = this.boundingBox.pos.x - this.boundingBox.dim.length / 2 + this.offset[0]
        let maxX =  this.boundingBox.pos.x + this.boundingBox.dim.length / 2 + this.offset[0]
        let minY = this.boundingBox.pos.y - this.boundingBox.dim.height / 2 + this.offset[1]
        let maxY =  this.boundingBox.pos.y + this.boundingBox.dim.height / 2 + this.offset[1]
        if (parent) {
            x -= parent.boundingBox.pos.x
            y -= parent.boundingBox.pos.y
        }

        
        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
            let clicked = false
            for (let i of this.children) {
                clicked = clicked || i.isClicked(event, this)
            }
            if (!clicked) {
                if (this.onClick) {
                    this.onClick(event)
                }
            }
            return true
        } else {
            return false
        }
    }

    getEvents(): Map<string, (evnt: MouseEvent) => void> {
        throw new Error("Method not implemented.");
    }
    getEventType(): string {
        return "MOUSE"
    }
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        
    }

    copy(component: Component): void {
        throw new Error("Method not implemented.");
    }

}