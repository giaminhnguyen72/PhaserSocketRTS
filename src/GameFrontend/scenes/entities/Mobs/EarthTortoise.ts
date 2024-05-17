import { TimedSpriteSheet } from "../../../../engine/src/systems/graphics/components/2d/Spritesheet.js";
import { Scene } from "../../../../engine/src/core/scene.js";
import { Component } from "../../../../engine/src/types/components.js";
import { Entity } from "../../../../engine/src/types/Entity.js";
import { Transform } from "../../../../engine/src/systems/physics/components/transform.js";

import { Script } from "../../../../engine/src/systems/scripting/components/Script.js";
import { EngineType } from "../../../../engine/src/constants/engineType.js";
import { TimedSpriteSheet3d } from "../../../../engine/src/systems/graphics/components/3d/SpriteSheet3d.js";
import { BoxCollider } from "../../../../engine/src/systems/Collision/components/Collider.js";
import { Sprite3d } from "../../../../engine/src/systems/graphics/components/3d/Sprite3d.js";
import { MultiplayerSyncronizer } from "../../../../engine/src/systems/MultiplayerClient/components/Syncronizer.js";
import { Vector3 } from "../../../../engine/src/types/components/physics/transformType.js";
import { getDirection, getDistance, lerp } from "../../../../engine/src/math/Vector.js";
import { ScriptOperable } from "../../../../engine/src/systems/scripting/types/Operations.js";
import { ScriptingEngine } from "../../../../engine/src/systems/scripting/ScriptingEngine.js";
import { Earthquake } from "../Attacks/Earthquake.js";
type Data = {
    componentId: number[],
    position: Vector3,
    direction: Vector3
}

export class EarthTortoise implements Entity {
    components: [TimedSpriteSheet3d, Transform, Script,MultiplayerSyncronizer<EarthTortoise, Data>];
    id?: number | undefined;
    scene!: Scene ;
    className: string = "EARTHTORTOISE";

    constructor() {
        let transform = new Transform()
        transform.pos.x = 0
        transform.pos.y = 0
        transform.pos.z = 10
        transform.vel.x = 0
        transform.vel.y = 0
        let sprite = new TimedSpriteSheet3d("/images/Characters/EarthTortoise_S.png", {
            rot:0,
            dim:{
                length: 64,
                height:64
            },
            pos: {
                x:0,
                y:0,
                z:0
            }
    }, 50, 32, [1,1])

        let collider = new BoxCollider({dim:{length:64, height: 64},pos: {x:0,y:0,z:5}, rot: 0}, () => {
            transform.vel.x *= -1
            transform.vel.y *= -1
        })

        

        collider.bindPos(transform)
        sprite.bindPos(transform)


        let script = new Script(this.className, EngineType.SOCKETSERVER)

        script.setProperty("HP", 100)
        script.setProperty("EXP", 0)
        script.setProperty("Attack", 5)
        script.setProperty("Defense", 5)
        script.setProperty("Speed", 0.05)
        script.setProperty("Position",transform.pos)
        let vec = {x: transform.pos.x, y: transform.pos.y}
        script.setProperty("Destination", vec)
        script.setProperty("Graphics", 0)
        script.setProperty("Range", 0)
        script.setProperty("Cooldown", 0)
        script.setProperty("Direction", {x:1,y:0,z:0})
        // e need attack AI
        script.setInit((system) =>{

            system.addSuperClasses(script, "Livable", "Moveable", "SpriteSheet", "Enemy", "EARTHTORTOISE")

            sprite.visible = true
            collider.visible = true
        })

        
        // script.setCallBack((dt: number) => {

        //     let HP = script.properties.get("HP")
        //     let Destination = script.properties.get("Destination")
        //     //this.transform.vel.x = 1
            
        //     if (Destination) {
                
        //         
        //     }
            
        //     if (HP != undefined && HP != null && HP <= 0) {
        //         this.scene.removeEntity(this.id as number)
        //         let inventoryID = script.properties.get("InventoryID")
        //         if (inventoryID) {
        //             this.scene.removeEntity(inventoryID)
        //         }
                
        //     }
            


        // })
        let sync = new MultiplayerSyncronizer<EarthTortoise, Data>(this, (data: Data) =>{

            //script.properties.set("Destination", data.destination)
            transform.pos.x = data.position.x
            transform.pos.y = data.position.y
            for (let i = 0; i < data.componentId.length; i++) {
                this.components[i].componentId = data.componentId[i]
            }
        }, ()=> {
            let array = []
            let direction = script.properties.get("Direction")
            if (!direction) {
                direction = {x: 1, y: 0, z: 0 }
            }
            for (let i of this.components) {
                array.push(i.componentId as number)
            }

            return {
                position: transform.pos,
                componentId: array,
                direction: direction
            }
        }, (currtime: number, timestamp: number, data) => {
            let total = timestamp - sync.time
            let elapsed = currtime - sync.time
            let dt = elapsed / total


            let component = data 
            if (component.data && sync.data) {
                transform.pos.x = lerp(transform.pos.x, component.data.position.x, dt)
                transform.pos.y = lerp(transform.pos.y, component.data.position.y, dt)
                let direction = script.properties.get("Direction")
                direction.x = component.data.direction.x
                direction.y = component.data.direction.y
            }
        })
        

        this.components = ([sprite, transform, script, sync])
        
        
        
    }
    clone(): Entity {
        return this
    }
    spawn(scene: Scene, pos: Vector3) {
        let monster = this
        let position = monster.components[2].properties.get("Position")
        if (position) {
            position.x = pos.x
            position.y= pos.y
        }
        scene.addEntity(monster)
    }

}

export class EarthTortoiseSystem implements ScriptOperable {
    update(dt: number, scriptingEngine: ScriptingEngine): void {
        let earthtortoise = scriptingEngine.queryClass("EARTHTORTOISE")

        if (earthtortoise) {
            let minimum = 10000000


            for (let i of earthtortoise) {
                let pos = i.properties.get("Position")
                let cooldown = i.properties.get("Cooldown")
                
                let scene = scriptingEngine.sceneManager.currScene
                if (cooldown > 5000) {
                    let earthquake = new Earthquake()
                    earthquake.components[1].pos.x = pos.x
                    earthquake.components[1].pos.y = pos.y
                    scene.addEntity(earthquake)
                    i.properties.set("Cooldown", 0)
                } else {
                    i.properties.set("Cooldown", cooldown + dt)
                }

                
                // should we targer 



                
            }
        }


    }

}