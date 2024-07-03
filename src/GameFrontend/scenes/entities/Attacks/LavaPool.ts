
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
import { TimedSpriteSheet3d } from "../../../../engine/src/systems/graphics/components/3d/SpriteSheet3d.js";
import { BoxCollider } from "../../../../engine/src/systems/Collision/components/Collider.js";
import { ScriptingEngine } from "../../../../engine/src/systems/scripting/ScriptingEngine.js";
import { ScriptOperable } from "../../../../engine/src/systems/scripting/types/Operations.js";
import { EarthTortoise } from "../Mobs/EarthTortoise.js";
type Data = {
    componentId: number[],
    vel: Vector3,
    position: Vector3

}
export class LavaPool implements Entity {
    components: [Sprite3d, Transform, MultiplayerSyncronizer<LavaPool, Data>,Script,BoxCollider];;
    id?: number | undefined;
    scene!: Scene;
    className: string = "LAVAPOOL";
    constructor(pos: Vector3 = {x:0, y:0, z:0}, dir: Vector3= {x:0,y:0,z:0}) {

        let transform = new Transform(pos)
        let sprite = new Sprite3d({
            dim:{
                length: 128,
                height: 128
            },
            rot: 0,
            pos: transform.pos

    },"/images/Projectiles/LavaField.png", )

    let sync = new MultiplayerSyncronizer<LavaPool, Data>(this, (data: Data) =>{

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
    let collider = new BoxCollider({dim:{length:128, height: 64},pos: {x:0,y:0,z:5}, rot: 0}, (col) => {
        let entID = col.entity as number
        let ent = this.scene.entities.get(col.entity as number)
        if (entID == script.get("Owner")) {
            return
        } 
        if (ent) {
            let cooldown = script.get("Cooldown")


            
            for (let i of ent.components) {
                if (i instanceof Script) {
                    let currType = i.get("Type")
                    switch (currType) {
                        case 0:
                            // 
                            let hitSet = script.get("Hit")
                            if (!hitSet.has(col.entity)) {
                                let enemyHP = i.get("HP")
                                i.set("HP", enemyHP - 10)
                                hitSet.add(col.entity)
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
        let script = new Script(this.className,EngineType.SOCKETSERVER)
        script.properties.set("Position", transform.pos)
        script.properties.set("Duration", 2200)
        script.properties.set("Cooldown", 0)
        script.properties.set("Owner", 0)
        script.set("Hit", new Set())
        script.set("State", 0)
        
        
        script.setInit((system) => {
            system.addSuperClasses(script, "Projectile","LavaPool")
        })
        collider.bindPos(transform)
        // Needs colllider
        this.components = [sprite, transform,sync,script, collider]


    }
    clone(): Entity {
        throw new Error("Method not implemented.");
    }
    setOwner(owner: number) {
        this.components[3].set("Owner",owner)
    }

}
export class LavaPoolSystem implements ScriptOperable {
    constructor() {

    }
    update(dt: number, script:ScriptingEngine): void {
        let quakes = script.queryClass("LavaPool")
        if (quakes) {
            for (let quake of quakes) {
                let cooldown = quake.get("Cooldown")
                if (cooldown >= 500) {
                    let hitSet = quake.get("Hit")

                    quake.set("Cooldown", 0)
                    hitSet.clear()
                } else {
                    quake.set("Cooldown",cooldown + dt)
                }
                

            }
        }

    }
}