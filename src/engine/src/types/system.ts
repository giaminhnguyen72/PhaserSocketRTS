import { Component } from "./components.js"


export interface System<T extends Component> {
    tag: string
    components: T[]
    update(dt: number):void

}
