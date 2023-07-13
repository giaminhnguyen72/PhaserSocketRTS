import { PriorityQueue } from "../../../../../engine/src/structs/PriorityQueue.js";
import { Component, Renderable } from "../../components.js";

export interface RenderStrategy {
    registerStrategy(component:Renderable): void
    deregisterStrategy(id: number): void
    render(renderingArr: Renderable[]): void
    clear(): void

}
export class PainterStrategy implements RenderStrategy {
    queue: PriorityQueue<Renderable> = new PriorityQueue()
    render(renderingArr: Renderable[]): void {
        let list = []
        let size = this.queue.size
        for (let i = 0 ; i < size; i++) {
            let j = 0
            let dequeued = this.queue.dequeue() as Renderable
            list.push(dequeued)
                

        }
        for (let i = renderingArr.length - 1; i >= 0; i--) {

            let camera = renderingArr[i]

            console.log("Size is " + this.queue.size)

            camera.render(list, i)
            
        }
    }
    deregisterStrategy(id: number): void {
        
    }
    registerStrategy(component: Renderable): void {

        this.queue.enqueue(component, component.transform.z)


    }
    clear() { 

        this.queue.clear()
        
        console.log("Cleared queue length is " + this.queue.size)
    }
    

}