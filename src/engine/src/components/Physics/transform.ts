import { componentType } from "../../constants/componentType"
import { Component } from "../../types/components"
import { Entity } from "../../types/Entity"

export class Transform implements Component{
    x: number
    y: number
    z: number
    entity: Entity
    componentId: number
    tag: string = "PHYSICS"
    constructor(entityId:Entity, ComponentId: number, x:number=0, y:number=0,z:number=0) {
        this.entity = entityId
        this.componentId = ComponentId
        this.x = x
        this.y = y
        this.z = z

    }
    
    update(dt: number): void {
        throw new Error("Method not implemented.")
    }
}