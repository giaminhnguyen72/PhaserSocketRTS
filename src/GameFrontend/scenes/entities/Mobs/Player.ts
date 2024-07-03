import { TimedSpriteSheet } from "../../../../engine/src/systems/graphics/components/2d/Spritesheet.js";
import { Scene } from "../../../../engine/src/core/scene.js";
import { Component, SocketListener } from "../../../../engine/src/types/components.js";
import { Entity } from "../../../../engine/src/types/Entity.js";
import { Transform } from "../../../../engine/src/systems/physics/components/transform.js";

import { Camera } from "../../../../engine/src/systems/graphics/components/2d/Camera.js";
import { Script } from "../../../../engine/src/systems/scripting/components/Script.js";
import { EngineType } from "../../../../engine/src/constants/engineType.js";

import { KeyboardListener } from "../../../../engine/src/systems/events/components/KeyboardHandler.js";
import { MainScene } from "../../MainScene.js";
import { BoxCollider } from "../../../../engine/src/systems/Collision/components/Collider.js";
import { Sprite3d } from "../../../../engine/src/systems/graphics/components/3d/Sprite3d.js";
import { MultiplayerSyncronizer } from "../../../../engine/src/systems/MultiplayerClient/components/Syncronizer.js";
import { Vector3 } from "../../../../engine/src/types/components/physics/transformType.js";
import { Item } from "../items/Items.js";
import { NoItem } from "../items/NoItem.js";
import { FireWandItem } from "../items/FireWand.js";
import { TimedSpriteSheet3d } from "../../../../engine/src/systems/graphics/components/3d/SpriteSheet3d.js";
import { getDirection } from "../../../../engine/src/math/Vector.js";

type Data = {
    componentId: number[],
    position: Vector3
    direction: Vector3
    hp: number
    stamina: number
    exp: number
}

export class GamePlayer implements Entity {
    components: [TimedSpriteSheet3d, Transform, Script,MultiplayerSyncronizer<GamePlayer, Data>, ...Component[]];
    id?: number | undefined;
    scene!: Scene ;
    className: string = "PLAYER";
    transform: Transform
    script: Script
    constructor() {
        let transform = new Transform()
        transform.pos.x = 0
        transform.pos.y = 0
        transform.pos.z = 10
        transform.vel.x = 0
        transform.vel.y = 0
        
        let sprite = new TimedSpriteSheet3d("/images/Characters/Player_S.png", {
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
    }, 50, 64, [1,1])
        this.transform = transform
        let script = new Script(this.className, EngineType.SOCKETSERVER)
        let collider = new BoxCollider({dim:{length:40, height: 50},pos: {x:0,y:0,z:5}, rot: 0}, (col) => {
            
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
                                
                                let rect = col.getCollisionBox(collider)
                                let dir = getDirection(rect.pos, collider.boundingBox.pos)
                                let dx = dir.x * 0.5 * rect.dim.length
                                let dy = dir.y * 0.5 * rect.dim.height
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




        this.script = script
        script.setProperty("HP", 100)
        script.setProperty("MaxHP", 100)
        script.setProperty("Stamina", 100)
        script.setProperty("EXP", 0)
        script.setProperty("SkillPoints", 0)
        script.setProperty("Attack", 5)
        script.setProperty("Defense", 5)
        script.setProperty("Speed", 0.1)
        script.setProperty("Position",transform.pos)
        let vec = {x: transform.pos.x, y: transform.pos.y}
        script.setProperty("Destination", vec)
        script.setProperty("EXP",0)
        script.setProperty("SkillPoint", 0)
        script.setProperty("Modifier", {
            speed: 1,
            regen: 0,
            damage: 0
        })
        script.setProperty("Unlocked", new Set())
        script.setProperty("Type",0)
        script.setProperty("AttackCooldown",0)
        script.setProperty("StaminaCooldown", 0)
        script.setProperty("Direction", {x:1,y:0,z:0})
        script.setProperty("Graphics", 0)
        script.setProperty("UpdateUI", false)
        
        
        script.setInit((system) =>{

            system.addSuperClasses(script, "Moveable", "Player", "SpriteSheet")
            console.log("Player added")

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
        let sync = new MultiplayerSyncronizer<GamePlayer, Data>(this, (data: Data) =>{

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
                direction: direction,
                hp: script.properties.get("HP"),
                stamina: script.properties.get("Stamina"),
                exp: script.get("EXP")
            }
        }, (currtime: number, timestamp: number, data) => {
            let total = timestamp - sync.time
            let elapsed = currtime - sync.time
            let dt = elapsed / total


            let component = data 
            if (component.data && sync.data) {
                if (component.data.hp !== script.properties.get("HP") || component.data.stamina !== script.properties.get("Stamina")) {
                    script.properties.set("HP", component.data.hp)
                    script.properties.set("Stamina", component.data.stamina)
                    script.setProperty("EXP",component.data.exp)
                    script.setProperty("UpdateUI", true)
                }
                sync.data.position
                transform.pos.x = lerp(sync.data.position.x, component.data.position.x, dt)
                transform.pos.y = lerp(sync.data.position.y, component.data.position.y, dt)
                let direction = script.properties.get("Direction")
                direction.x = component.data.direction.x
                direction.y = component.data.direction.y

            }
        })
        

        this.components = [sprite, transform, script, sync,collider]
        
        
        
    }
    clone(): Entity {
        return new GamePlayer()
    }

}
function lerp(init: number, future: number, dt : number) {
    let returned = (1- dt) * init + dt * future

    return returned
}