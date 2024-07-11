
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
import { ExpEvent } from "../../../../GameFrontend/events/ExpEvent.js";
type Data = {
    componentId: number[],
    vel: Vector3,
    position: Vector3

}
export class SwordStab implements Entity {
    components: [TimedSpriteSheet3d, Transform, MultiplayerSyncronizer<SwordStab, Data>, Script,...Component[]];
    id?: number | undefined;
    scene!: Scene ;
    className: string = "SWORDSTAB";
    constructor(owner: number =0, pos: Vector3 = {x:0, y:0, z:0}, dir: Vector3= {x:0,y:0,z:0}, ) {
        let vel = {x: dir.x* 0.2, y: dir.y * 0.2,z:0}
        let transform = new Transform(pos, vel)
        let sprite = new TimedSpriteSheet3d("/images/Projectiles/Sword_S.png", {
            dim:{
                length: 96,
                height: 96
            },
            rot: -Math.PI/2,
            pos: transform.pos

    }, 450, 64, [2])
    let collider = new BoxCollider({dim:{length:96, height: 64},pos: {x:0,y:0,z:5}, rot: 0}, (col) => {
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
                            let damage = script.get("Damage")
                            if (enemyHP - damage <= 0) {
                                let e = this.scene.sceneManager.queryEngine<ScriptingEngine>("SCRIPTING",ScriptingEngine)
                                if (e) {
                                    let players = e.queryClass("Player")
                                    if (players == undefined || players.has(i) == false) {
                                            
                                    } else {
                                        let entity = e.operations.addEntity(script.componentId as number)
                                        let exp = new ExpEvent()
                                        exp.playerID = script.get("Owner")
                                        exp.exp = 20
                                        entity.addComponent<ExpEvent>(ExpEvent, exp)
                                    }
                                }
                            }
                            i.set("HP", enemyHP - damage)
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
    
    let sync = new MultiplayerSyncronizer<SwordStab, Data>(this, (data: Data) =>{

        //script.properties.set("Destination", data.destination)
        transform.pos.x = data.position.x
        transform.pos.y = data.position.y
        transform.vel.x = data.vel.x
        transform.vel.y = data.vel.y
        if (transform.vel.x <= 0) {
            sprite.shape.rot = Math.PI / 2
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
        script.properties.set("Position", transform.pos)
        script.properties.set("Duration", 1000)
        script.set("Damage", 40)
        script.properties.set("Owner", owner)
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