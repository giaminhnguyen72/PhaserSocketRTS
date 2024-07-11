import { TimedSpriteSheet } from "../../../../engine/src/systems/graphics/components/2d/Spritesheet.js";
import { Scene } from "../../../../engine/src/core/scene.js";
import { Component } from "../../../../engine/src/types/components.js";
import { Entity } from "../../../../engine/src/types/Entity.js";
import { Transform } from "../../../../engine/src/systems/physics/components/transform.js";
import { TimedSpriteSheet3d } from "../../../../engine/src/systems/graphics/components/3d/SpriteSheet3d.js";
import { Script } from "../../../../engine/src/systems/scripting/components/Script.js";
import { EngineType } from "../../../../engine/src/constants/engineType.js";

import { BoxCollider } from "../../../../engine/src/systems/Collision/components/Collider.js";
import { Sprite3d } from "../../../../engine/src/systems/graphics/components/3d/Sprite3d.js";
import { MultiplayerSyncronizer } from "../../../../engine/src/systems/MultiplayerClient/components/Syncronizer.js";
import { Vector3 } from "../../../../engine/src/types/components/physics/transformType.js";
import { getDirection, getDistance, lerp } from "../../../../engine/src/math/Vector.js";
import { ScriptOperable } from "../../../../engine/src/systems/scripting/types/Operations.js";
import { ScriptingEngine } from "../../../../engine/src/systems/scripting/ScriptingEngine.js";
import { Poison } from "../../../../GameFrontend/events/Poison.js";
type Data = {
    componentId: number[],
    position: Vector3,
    direction: Vector3

}

export class Snake implements Entity {
    components: [TimedSpriteSheet3d, Transform, Script,MultiplayerSyncronizer<Snake, Data>,BoxCollider];
    id?: number | undefined;
    scene!: Scene ;
    className: string = "SNAKE";
    constructor() {
        let transform = new Transform()
        transform.pos.x = 0
        transform.pos.y = 0
        transform.pos.z = 10
        transform.vel.x = 0
        transform.vel.y = 0
        let sprite = new TimedSpriteSheet3d("/images/Characters/Snake_S.png", {
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

        let collider = new BoxCollider({dim:{length:32, height: 32},pos: {x:0,y:0,z:5}, rot: 0}, (col) => {

            if (script.get("State") === 1) {
                return
            }
            let hitEntity = this.scene.entities.get(col.entity as number)
            if (hitEntity) {
                for (let component of hitEntity.components) {
                    if (component instanceof Script) {
                        if (component.get("Type") == 2) {
                            return
                        }
                        let players = script.system.queryClass("Player")
                        if (players?.has(component)) {
                            let poison = new Poison()
                            poison.damageAmount = 5
                            poison.duration = 5000
                            poison.poisonTime = 1000
                            poison.scriptID = component.componentId as number
                            script.system.operations.addEntity(component.componentId as number).addComponent<Poison>(Poison,poison)
                            script.set("State", 1)
                        }
                    }
                }
            }
            let rect = col.getCollisionBox(collider)
            let dir = getDirection(rect.pos, collider.boundingBox.pos)
            let dx = dir.x * 0.5 * rect.dim.length
            let dy = dir.y * 0.5 * rect.dim.height
            collider.boundingBox.pos.x += dx
            collider.boundingBox.pos.y += dy
        })

        

        collider.bindPos(transform)
        sprite.bindPos(transform)


        let script = new Script(this.className, EngineType.SOCKETSERVER)

        
        script.setProperty("HP", 5)
        script.setProperty("EXP", 0)
        script.setProperty("Attack", 5)
        script.setProperty("Defense", 5)
        script.setProperty("Speed", 0.08)
        script.setProperty("Type", 0)
        script.setProperty("State", 0)
        script.setProperty("Position",transform.pos)
        script.setProperty("Cooldown", 0)
        let vec = {x: transform.pos.x, y: transform.pos.y}
        script.setProperty("Destination", vec)
        script.setProperty("Modifier", {
            speed: 1,
            regen: 0,
            damage: 0
        })
        script.setProperty("Graphics", 0)
        script.setProperty("Range", 0)
        script.setProperty("Direction", {x:1,y:0,z:0})
        // e need attack AI
        script.setInit((system) =>{

            system.addSuperClasses(script, "Livable", "Moveable", "SpriteSheet", "SNAKE")

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
        let sync = new MultiplayerSyncronizer<Snake, Data>(this, (data: Data) =>{

            //script.properties.set("Destination", data.destination)
            transform.pos.x = data.position.x
            transform.pos.y = data.position.y
            for (let i = 0; i < data.componentId.length; i++) {
                this.components[i].componentId = data.componentId[i]
            }
        }, ()=> {
            let array = []
            for (let i of this.components) {
                array.push(i.componentId as number)
            }
            let direction = script.properties.get("Direction")
            if (!direction) {
                direction = {x: 1, y: 0, z: 0 }
            }
            return {
                position: transform.pos,
                componentId: array,
                direction: transform.vel
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
export class SnakeSystem implements ScriptOperable{
    constructor() {

    }
    update(dt: number, script:ScriptingEngine): void {
        let snakes = script.queryClass("SNAKE")
        let players = script.queryClass("Player")
        if (snakes) {
            
            for (let snake of snakes) {
                let minPos;
                let currPos = snake.get("Position")
                let cooldown = snake.get("Cooldown")
                if (players) {
                    
                    let minDist = 100000000000
                    for (let player of players) {
                        let playerPos = player.get("Position")
                        let dist = getDistance(currPos, playerPos)
                        if (dist < minDist) {
                            minDist = dist
                            minPos = playerPos
                        }
                    }
                }
                let state = snake.properties.get("State")
                if (minPos) {
                    let dest = snake.get("Destination")


                    if (state === 0) {
                        dest.x = minPos.x
                        dest.y = minPos.y
                    } else {
                        let dir = getDirection(minPos,currPos)
                        dest.x = currPos + dir.x * 50
                        dest.y = currPos + dir.y * 50
                    }
                    
                }
                if (state === 1 && cooldown >= 5000) {
                    snake.set("State", 0)
                    snake.set("Cooldown" , 0)
                } else if (state === 1) {
                    snake.set("Cooldown", cooldown + dt)
                }


            }
        } else {

        }

    }

}