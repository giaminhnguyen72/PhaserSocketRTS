'use strict'
import { Collideable, Component } from "../../types/components.js";
import { Shape, Rectangle } from "../../types/components/collision/shape.js";
import { Position } from "../../types/components/physics/transformType.js";
import { Entity } from "../../types/Entity.js";
import { Transform } from "../Physics/transform.js";


export class BoxCollider implements Collideable {
    entity: Entity;
    engineTag: string = "COLLISION";
    componentId?: number | undefined;
    prev: Position
    collideType: string;
    shape: Rectangle
    onCollision: (otherCollider: Collideable) => void
    constructor(entity: Entity,  pos: Position, onCollision: (otherCollider: Collideable) => void) {
        this.entity = entity
        this.collideType = "Box"
        this.shape = {
            pos: pos,
            dim: { length: 20, height: 20},
            rot: 0
        }
        this.prev = {
            x: pos.x,
            y: pos.y,
            z: pos.z
        }
        this.onCollision = onCollision
    }
    
    checkCollision(collider: Collideable): boolean {
        console.log("Checking Collision")
        let doesCollide = false
        let ret: boolean = false
        if (collider instanceof BoxCollider) {
            

            let rect = collider.shape
            let rectangle = this.shape
            if (rect.rot == 0 && rectangle.rot == 0) {
                if (
                    rect.pos.x + rect.dim.length > rectangle.pos.x &&
                    rect.pos.x <  rectangle.pos.x +rectangle.dim.length &&
                    rect.pos.y + rect.dim.height > rectangle.pos.y &&
                    rect.pos.y < rectangle.pos.y + rectangle.dim.height 
        
                ) {
                    return true
                } else {
                    return false
                }
            } else {
                console.log("slanted box")
            }
            
            
        } else {
            console.log("not box")
        }
        return ret
    }

    collides(collider: Collideable): void {
        console.log("Collided")
        this.onCollision(collider)
    }
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        console.log("Updating Box Collider")
        this.prev.x = this.shape.pos.x
        this.prev.y = this.shape.pos.y
        this.prev.z = this.shape.pos.z

        
    }


    
}
export class CircleCollider implements Collideable {
    entity: Entity;
    engineTag: string = "COLLISION";
    componentId?: number | undefined;
    collideType: string;
    shape: Rectangle
    onCollision: (otherCollider: Collideable) => void
    constructor(entity: Entity,  pos: Position, onCollision: (otherCollider: Collideable) => void) {
        this.entity = entity

        this.collideType = "Box"
        this.shape = {
            pos: pos,
            dim: { length: 20, height: 20},
            rot: 0
        }
        this.onCollision = onCollision
    }
    
    checkCollision(collider: BoxCollider): boolean {
        var doesCollide = false
        return false
    }
    collides(collider: Collideable): void {
        this.onCollision(collider)
    }
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        
    }


    
}