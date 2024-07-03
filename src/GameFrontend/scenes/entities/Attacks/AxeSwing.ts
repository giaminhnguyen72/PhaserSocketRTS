import { Scene } from "../../../../engine/src/core/scene.js";
import { Component} from "../../../../engine/src/types/components.js";
import { Entity } from "../../../../engine/src/types/Entity.js";
import { Transform } from "../../../../engine/src/systems/physics/components/transform.js";

import { Script } from "../../../../engine/src/systems/scripting/components/Script.js";
import { EngineType } from "../../../../engine/src/constants/engineType.js";


import { Sprite3d } from "../../../../engine/src/systems/graphics/components/3d/Sprite3d.js";
import { MultiplayerSyncronizer } from "../../../../engine/src/systems/MultiplayerClient/components/Syncronizer.js";
import { Vector3 } from "../../../../engine/src/types/components/physics/transformType.js";
import { getDirection, lerp } from "../../../../engine/src/math/Vector.js";
import { TimedSpriteSheet3d } from "../../../../engine/src/systems/graphics/components/3d/SpriteSheet3d.js";
import { BoxCollider } from "../../../../engine/src/systems/Collision/components/Collider.js";
type Data = {
    componentId: number[],
    vel: Vector3,
    position: Vector3
    rot: number,
    direction: number
}
export class GreatAxe implements Entity {
    components: [Sprite3d, Transform, MultiplayerSyncronizer<GreatAxe, Data>, Script, Component];
    id?: number | undefined;
    scene!: Scene ;
    className: string = "GREATAXE";
    constructor(owner: number =0, pivot: Vector3 = {x:0, y:0, z:0}) {

        let axis = {
            x: pivot.x ,
            y: pivot.y ,
            z: pivot.z
        }
        let pos = {
            x: pivot.x ,
            y: pivot.y ,
            z: pivot.z
        }
        let transform = new Transform(pos)
        let sprite = new Sprite3d( {
            dim:{
                length: 64,
                height: 64
            },
            rot: 0,
            pos: transform.pos

    }, "/images/Projectiles/GreatAxe.png")
    let sync = new MultiplayerSyncronizer<GreatAxe, Data>(this, (data: Data) =>{

        //script.properties.set("Destination", data.destination)
        transform.pos.x = data.position.x
        transform.pos.y = data.position.y
        transform.vel.x = data.vel.x
        transform.vel.y = data.vel.y
        for (let i = 0; i < data.componentId.length; i++) {
            this.components[i].componentId = data.componentId[i]
        }
    }, ()=> {
        let array = []
        for (let i of this.components) {
            array.push(i.componentId as number)
        }
        
        let rot = script.properties.get("Angle")
        return {
            vel: transform.vel,
            position: transform.pos,
            componentId: array,
            rot: rot,
            direction: script.get("Direction")
        }
    }, (currtime: number, timestamp: number, data) => {
        let total = timestamp - sync.time
        let elapsed = currtime - sync.time
        let dt = elapsed / total
        

        let component = data 
        
        if (component.data && sync.data) {
            if (component.data.direction >= 0) {
                sprite.shape.rot = component.data.rot - 1 * Math.PI / 2
            } else {
                sprite.shape.rot = component.data.rot - 3 * Math.PI / 2
            }
            transform.pos.x = lerp(transform.pos.x, component.data.position.x, dt)
            transform.pos.y = lerp(transform.pos.y, component.data.position.y, dt)
        }
    })
        let script = new Script(this.className,EngineType.SOCKETSERVER)
        script.properties.set("Duration", 500)
        script.properties.set("Owner", owner)
        script.properties.set("Owner", owner)
        //Spinning Components
        script.properties.set("Radius", 50)
        script.properties.set("Position", pos)
        script.properties.set("Axis", axis)
        script.set("Direction", 1)
        script.properties.set("Angle", 3 *Math.PI / 2)
        // TIme is a constant value that never changes representing the the amount of time to do one rotation
        script.properties.set("Time", 1000)
        let collider = new BoxCollider({dim:{length:64, height: 64},pos: {x:0,y:0,z:5}, rot: 0}, (col) => {
            let entID = col.entity as number
            let ent = this.scene.entities.get(col.entity as number)
            if (entID == script.get("Owner")) {
                return
            } 
            if (ent) {
                
                for (let i of ent.components) {
                    if (i instanceof Script) {
                        let currType = i.get("Type")
                        switch (currType) {
                            case 0:
                                //  
    
                                let enemyHP = i.get("HP")
                                let dir = getDirection(collider.boundingBox.pos, col.boundingBox.pos)
                                col.boundingBox.pos.x += dir.x * 10
                                col.boundingBox.pos.y += dir.y * 10
                                i.set("HP", enemyHP - 30)

                                this.scene.removeEntity(this.id as number)
                                break
                            case 1:
                                break
                            default:
                                break
    
                        }
                        return
    
                    }
                }
            }
        })
        script.setInit((system) => {
            system.addSuperClasses(script, "Projectile", "Spinning")
        })

        collider.bindPos(transform)
        // Needs colllider
        this.components = [sprite, transform,sync,script, collider]


    }
    clone(): Entity {
        throw new Error("Method not implemented.");
    }
    setOwner(id: number) {
        this.components[3].set("Owner", id)
    }

}