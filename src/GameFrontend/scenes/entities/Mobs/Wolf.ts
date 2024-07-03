import { TimedSpriteSheet } from "../../../../engine/src/systems/graphics/components/2d/Spritesheet.js";
import { Scene } from "../../../../engine/src/core/scene.js";
import { Component } from "../../../../engine/src/types/components.js";
import { Entity } from "../../../../engine/src/types/Entity.js";
import { Transform } from "../../../../engine/src/systems/physics/components/transform.js";

import { Script } from "../../../../engine/src/systems/scripting/components/Script.js";
import { EngineType } from "../../../../engine/src/constants/engineType.js";

import { BoxCollider } from "../../../../engine/src/systems/Collision/components/Collider.js";
import { Sprite3d } from "../../../../engine/src/systems/graphics/components/3d/Sprite3d.js";
import { MultiplayerSyncronizer } from "../../../../engine/src/systems/MultiplayerClient/components/Syncronizer.js";
import { Vector3 } from "../../../../engine/src/types/components/physics/transformType.js";
import { getDirection, lerp } from "../../../../engine/src/math/Vector.js";
import { TimedSpriteSheet3d } from "../../../../engine/src/systems/graphics/components/3d/SpriteSheet3d.js";
type Data = {
    componentId: number[],
    position: Vector3
    direction: Vector3
}

export class Wolf implements Entity {
    components: [TimedSpriteSheet3d, Transform, Script,MultiplayerSyncronizer<Wolf, Data>,BoxCollider];
    id?: number | undefined;
    scene!: Scene ;
    className: string = "WOLF";

    constructor() {
        let transform = new Transform()
        transform.pos.x = 0
        transform.pos.y = 0
        transform.pos.z = 10
        transform.vel.x = 0
        transform.vel.y = 0
        let sprite = new TimedSpriteSheet3d("/images/Characters/Wolf_S.png", {
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

        let collider = new BoxCollider({dim:{length:36, height: 45},pos: {x:0,y:0,z:5}, rot: 0}, (col) => {
            
            let entID = col.entity as number
            let ent = this.scene.entities.get(col.entity as number)
            if (ent) {
                
                for (let i of ent.components) {
                    if (i instanceof Script) {
                        let currType = i.get("Type")
                        switch (currType) {
                            case 0:
                                //  

                                // let colliderSpeed= i.get("Speed")
                                // let colliderDest = i.get("Destination")
                                // let colliderPos = i.get("Position")
                                // let colliderDir = getDirection(colliderPos, colliderDest)
                                // let colliderVelX = colliderSpeed * colliderDir.x
                                // let colliderVelY = colliderSpeed * colliderDir.y

                                // let currSpeed= i.get("Speed")
                                // let currDest = i.get("Destination")
                                // let currPos = i.get("Position")
                                // let currDir = getDirection(currPos, currDest)
                                // let currVelX = currSpeed * currDir.x
                                // let currVelY = currSpeed * currDir.y

                                // let dx = 
                                let hitEntity = this.scene.entities.get(col.entity as number)
                                let backwardDist = 0
                                if (hitEntity) {
                                    for (let component of hitEntity.components) {
                                        if (component instanceof Script) {

                                            let players = script.system.queryClass("Player")
                                            if (players?.has(component)) {
                                                let hp = component.get("HP")
                                                component.set("HP", hp - 5)
                                                backwardDist = 20
                                            }
                                        }
                                    }
                                }
                                
                                let rect = col.getCollisionBox(collider)
                                let dir = getDirection(rect.pos, collider.boundingBox.pos)
                                let dx = dir.x * 0.5 * rect.dim.length + backwardDist *dir.x
                                let dy = dir.y * 0.5 * rect.dim.height + backwardDist *dir.y
                                collider.boundingBox.pos.x += dx
                                collider.boundingBox.pos.y += dy
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
        sprite.bindPos(transform)


        let script = new Script(this.className, EngineType.SOCKETSERVER)

        
        script.setProperty("HP", 80)
        script.setProperty("EXP", 0)
        script.setProperty("Attack", 5)
        script.setProperty("Defense", 5)
        script.setProperty("Speed", 0.1)
        script.setProperty("Position",transform.pos)
        let vec = {x: transform.pos.x, y: transform.pos.y}
        script.setProperty("Destination", vec)
        script.setProperty("Graphics", 0)
        script.setProperty("Modifier", {
            speed: 1,
            regen: 0,
            damage: 0
        })
        script.setProperty("Type", 0)
        script.setProperty("Range", 0)
        script.setProperty("Direction", {x:1,y:0,z:0})
        // e need attack AI
        script.setInit((system) =>{

            system.addSuperClasses(script, "Livable", "Moveable", "SpriteSheet", "Enemy")

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
        let sync = new MultiplayerSyncronizer<Wolf, Data>(this, (data: Data) =>{

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
        

        this.components = ([sprite, transform, script, sync,collider])
        
        
        
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