
import { PhysicsEngine } from "../../systems/physics/PhysicsEngine.js"
import { Component, Transformable } from "../../types/components.js"
import { Acceleration, Position, Velocity } from "../../types/components/physics/transformType.js"
import { Entity } from "../../types/Entity.js"
import { System } from "../../types/system.js"

export class Transform implements Transformable {
    pos: Position
    vel: Velocity
    accel: Acceleration
    entity: Entity
    componentId?: number
    readonly engineTag: string = "PHYSICS"
    constructor(
                entity: Entity,
                pos: Position={x:0, y: 0, z: 0},
                vel: Velocity={x:0, y: 0, z: 0},
                accel: Acceleration={x:0,y:0,z:0}
                ) 
        {
            
        this.entity = entity
        this.pos = pos
        this.vel = vel
        this.accel = accel


    }
    visible: boolean = true
    alive: boolean = true
    system!: System<Component>
    
    update(dt: number): void {
        console.log("Position is: " + this.pos.x + " and " + this.pos.y)
        this.vel.x = this.vel.x  + this.accel.x * dt
        this.vel.y = this.vel.y  + this.accel.y * dt
        this.vel.z = this.vel.z  + this.accel.z * dt

        this.pos.x = this.pos.x  + this.vel.x * dt
        this.pos.y = this.pos.y  + this.vel.y * dt
        this.pos.z = this.pos.z  + this.vel.z * dt
    }
    
}
