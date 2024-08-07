
import { Scene } from "../../../../../engine/src/core/scene.js";
import { Component} from "../../../../../engine/src/types/components.js";
import { Entity } from "../../../../../engine/src/types/Entity.js";
import { Transform } from "../../../../../engine/src/systems/physics/components/transform.js";

import { Script } from "../../../../../engine/src/systems/scripting/components/Script.js";
import { EngineType } from "../../../../../engine/src/constants/engineType.js";


import { Sprite3d } from "../../../../../engine/src/systems/graphics/components/3d/Sprite3d.js";
import { MultiplayerSyncronizer } from "../../../../../engine/src/systems/MultiplayerClient/components/Syncronizer.js";
import { Vector3 } from "../../../../../engine/src/types/components/physics/transformType.js";
import { lerp } from "../../../../../engine/src/math/Vector.js";
import { TimedSpriteSheet3d } from "../../../../../engine/src/systems/graphics/components/3d/SpriteSheet3d.js";
import { BoxCollider } from "../../../../../engine/src/systems/Collision/components/Collider.js";
import { ScriptingEngine } from "../../../../../engine/src/systems/scripting/ScriptingEngine.js";
import { Slow } from "../../../../../GameFrontend/events/Slow.js";
type Data = {
    componentId: number[],
    vel: Vector3,
    position: Vector3

}
export class Web implements Entity {
    components: [Sprite3d, Transform, MultiplayerSyncronizer<Web, Data>,Script,BoxCollider];;
    id?: number | undefined;
    scene!: Scene ;
    className: string = "WEB";
    constructor(pos: Vector3 = {x:0, y:0, z:8}, dir: Vector3= {x:0,y:0,z:0}) {
        let vel = {x: dir.x* 0.3, y: dir.y * 0.3,z:0}
        let transform = new Transform(pos, vel)
        let sprite = new Sprite3d({
            dim:{
                length: 128,
                height: 128
            },
            rot: 0,
            pos: transform.pos

    }, "/images/Structures/Web.png")
    let collider = new BoxCollider({dim:{length:128, height: 128},pos: {x:0,y:0,z:5}, rot: 0}, (col) => {
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
                            
                            let s = this.scene.querySystem<ScriptingEngine>(ScriptingEngine, "SCRIPTING")
                            if (s) {
                                let c = s.operations.dataManager.query<Slow>(Slow)
                                if (c) {
                                    let found = false
                                    c.iterate((slow) => {
                                        let slowedScript = s?.components.get(slow[1].scriptID)
                                        if (slowedScript && slowedScript.entity === col.entity) {
                                            found = true
                                            slow[1].multiplier = Math.min(slow[1].multiplier,0.8)
                                        }
                                        
                                    })
                                    if (found == false) {
                                        let slowC = new Slow()
                                        slowC.duration = 2000
                                        slowC.multiplier = 0.7
                                        slowC.scriptID = i.componentId as number

                                        s.operations.dataManager.addEntity(0).addComponent<Slow>(Slow,slowC)
                                    }
                                }
                            
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

    let sync = new MultiplayerSyncronizer<Web, Data>(this, (data: Data) =>{

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
        let script = new Script(this.className,EngineType.SOCKETSERVER)
        script.properties.set("Position", transform.pos)
        script.properties.set("Duration", 25000)
        script.properties.set("Cooldown", 0)
        script.properties.set("Type", 3)
        script.setInit((system) => {
            system.addSuperClasses(script, "Projectile")
        })
        collider.bindPos(transform)

        // Needs colllider
        this.components = [sprite, transform,sync,script,collider]


    }
    clone(): Entity {
        throw new Error("Method not implemented.");
    }

}