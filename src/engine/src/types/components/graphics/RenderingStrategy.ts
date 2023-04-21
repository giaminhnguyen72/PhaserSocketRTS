import { PriorityQueue } from "../../../../../engine/src/structs/PriorityQueue.js";
import { Component, Renderable } from "../../components.js";

export interface RenderStrategy {
    registerStrategy(component:Renderable): void
    render(renderingArr: Renderable[]): void
    clear(): void

}
export class PainterStrategy implements RenderStrategy {
    queue: PriorityQueue<Renderable> = new PriorityQueue()
    render(renderingArr: Renderable[]): void {
        console.log("Inside Painrer")
        for (let cameras of renderingArr) {
            let list = []
            console.log("Inside Camera loop")
            while (this.queue.size != 0) {
                
                list.push(this.queue.dequeue() as Renderable)
                
                console.log("Render Queue size is " + this.queue.size)
            }
            cameras.render(list)
            
        }
    }

    registerStrategy(component: Renderable): void {
        this.queue.enqueue(component, component.transform.pos.z)
    }
    clear() { 

        this.queue.clear()
        console.log("Cleared queue length is " + this.queue.size)
    }
    

}