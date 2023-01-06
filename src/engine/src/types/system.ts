import { Component } from "./components.js"


export interface System {
    tag: string
    components: Component[]
    update(dt: number):void
}
