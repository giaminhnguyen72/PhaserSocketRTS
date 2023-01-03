
import { Entity, GameObject } from "./Entity.js"

export interface Component {
    entity: Entity
    componentId: number
    update(dt: number): void
}
export interface ComponentObject {
    
}