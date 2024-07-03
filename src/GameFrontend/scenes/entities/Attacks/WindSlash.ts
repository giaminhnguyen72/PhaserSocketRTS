
import { Scene } from "../../../../engine/src/core/scene.js";
import { Component} from "../../../../engine/src/types/components.js";
import { Entity } from "../../../../engine/src/types/Entity.js";
import { Transform } from "../../../../engine/src/systems/physics/components/transform.js";

import { Script } from "../../../../engine/src/systems/scripting/components/Script.js";
import { EngineType } from "../../../../engine/src/constants/engineType.js";


import { Sprite3d } from "../../../../engine/src/systems/graphics/components/3d/Sprite3d.js";
import { MultiplayerSyncronizer } from "../../../../engine/src/systems/MultiplayerClient/components/Syncronizer.js";
import { Vector3 } from "../../../../engine/src/types/components/physics/transformType.js";
import { lerp } from "../../../../engine/src/math/Vector.js";
import { BoxCollider } from "../../../../engine/src/systems/Collision/components/Collider.js";
type Data = {
    componentId: number[],
    vel: Vector3,
    position: Vector3

}
export class Windslash implements Entity {
    components: [Sprite3d, Transform, MultiplayerSyncronizer<Windslash, Data>,Script, Component];
    id?: number | undefined;
    scene!: Scene;
    className: string = "WINDSLASH";
    constructor(owner: number= 0, pos: Vector3 = {x:0, y:0, z:0}, dir: Vector3= {x:0,y:0,z:0}) {
        let vel = {x: dir.x* 0.2, y: dir.y * 0.2,z:0}
        let transform = new Transform(pos, vel)
        let sprite = new Sprite3d({
            dim:{
                length: 32,
                height:32
            },
            rot: 0,
            pos: transform.pos

    }, "/images/Projectiles/Slash.png")
    let sync = new MultiplayerSyncronizer<Windslash, Data>(this, (data: Data) =>{

        //script.properties.set("Destination", data.destination)
        transform.pos.x = data.position.x
        transform.pos.y = data.position.y
        transform.vel.x = data.vel.x
        transform.vel.y = data.vel.y
        if (transform.vel.x < 0) {
            sprite.reflect = -1
        } else {
            sprite.reflect = 1
        }
        for (let i = 0; i < data.componentId.length; i++) {
            this.components[i].componentId = data.componentId[i]
        }
    }, ()=> {
        let array = []
        for (let i of this.components) {
            array.push(i.componentId as number)
        }

        return {
            vel: transform.vel,
            position: transform.pos,
            componentId: array,

        }
    }, (currtime: number, timestamp: number, data) => {
        let total = timestamp - sync.time
        let elapsed = currtime - sync.time
        let dt = elapsed / total


        let component = data 
        if (component.data && sync.data) {
            transform.pos.x = lerp(transform.pos.x, component.data.position.x, dt)
            transform.pos.y = lerp(transform.pos.y, component.data.position.y, dt)
        }
    })
        let script = new Script(this.className,EngineType.SOCKETSERVER)
        script.properties.set("Duration", 2000)
        script.setProperty("Position", transform.pos)
        script.properties.set("Owner", owner)
        script.properties.set("Hit", new Set())
        script.setInit((system) => {
            system.addSuperClasses(script, "Projectile")
        }) 
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
                                let hitSet = script.get("Hit")
                                if (!hitSet.has(col.entity)) {
                                    let enemyHP = i.get("HP")
                                    i.set("HP", enemyHP - 30)
                                    
                                    hitSet.add(col.entity)
                                }
                                
                                if (hitSet.size > 4) {
                                    this.scene.removeEntity(this.id as number)
                                }

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
        collider.bindPos(transform)
        // Needs colllider
        this.components = [sprite, transform,sync,script, collider]


    }
    clone(): Entity {
        throw new Error("Method not implemented.");
    }

}