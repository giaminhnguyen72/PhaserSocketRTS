import { Component } from "./components.js"


export interface System<T extends Component> {
    tag: string
    components: Map<number, T>
    update(dt: number):void
    register(comp: T): void
    unregister(comp:number): void

}
