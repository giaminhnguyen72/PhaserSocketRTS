import { TimedSpriteSheet } from "../../../../engine/src/systems/graphics/components/2d/Spritesheet.js";
import { Scene } from "../../../../engine/src/core/scene.js";
import { Component, SocketListener } from "../../../../engine/src/types/components.js";
import { Entity } from "../../../../engine/src/types/Entity.js";
import { Transform } from "../../../../engine/src/systems/physics/components/transform.js";
import { MouseListener } from "../../../../engine/src/systems/events/components/MouseHandler.js";
import { Camera } from "../../../../engine/src/systems/graphics/components/2d/Camera.js";
import { Script } from "../../../../engine/src/systems/scripting/components/Script.js";
import { EngineType } from "../../../../engine/src/constants/engineType.js";
import { Inventory } from "./PlayerComponents/Inventory.js";
import { KeyboardListener } from "../../../../engine/src/systems/events/components/KeyboardHandler.js";
import { MainScene } from "../../MainScene.js";
import { BoxCollider } from "../../../../engine/src/systems/Collision/components/Collider.js";
import { Sprite3d } from "../../../../engine/src/systems/graphics/components/3d/Sprite3d.js";
import { MultiplayerSyncronizer } from "../../../../engine/src/systems/MultiplayerClient/components/Syncronizer.js";
import { Vector3 } from "../../../../engine/src/types/components/physics/transformType.js";
import { Item } from "../items/Items.js";
import { NoItem } from "../items/NoItem.js";
import { FireWandItem } from "../items/FireWand.js";

type Data = {
    componentId: number[],
    inventory: Item[]
    position: Vector3

}

export class Knight implements Entity {
    components: Component[]= [];
    id?: number | undefined;
    scene!: Scene ;
    className: string = "KNIGHT";
    transform: Transform
    script: Script
    constructor() {
        let transform = new Transform()
        transform.pos.x = 0
        transform.pos.y = 0
        transform.pos.z = 10
        transform.vel.x = 0
        transform.vel.y = 0
        let sprite = new Sprite3d( {
            pos: {x:0, y: 0, z:0},
            dim: {
                length: 64,
                height: 64
            },
            rot: 0
        },"/images/Knight_Side.png",)
        this.transform = transform
        let collider = new BoxCollider({dim:{length:64, height: 64},pos: {x:0,y:0,z:5}, rot: 0}, () => {
            transform.vel.x *= -1
            transform.vel.y *= -1
        })
        sprite.reflect = -1
        

        collider.bindPos(transform)
        sprite.bindPos(transform)


        let script = new Script(this.className, EngineType.SOCKETSERVER)

        this.script = script
        script.setProperty("HP", 100)
        script.setProperty("EXP", 0)
        script.setProperty("Attack", 5)
        script.setProperty("Defense", 5)
        script.setProperty("Time", 5000)
        script.setProperty("Speed", 3)
        script.setProperty("Position",transform.pos)
        let vec = {x: transform.pos.x, y: transform.pos.y}
        script.setProperty("Destination", vec)

        script.setProperty("Direction", {x:1,y:0,z:0})
        let inventory: Item[] = []
        for (let i = 0; i < 8; i++) {
            inventory.push(new NoItem())
        }
        inventory[0] = new FireWandItem()
        script.setProperty("Inventory", inventory)
        

        script.setInit(() =>{

            script.system.addSuperClass(script, "Livable")

            sprite.visible = true
            collider.visible = true
        })
        script.destroy = () => {
            script.system.removeSuperClass(script, "Livable")
        }
        
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
        let sync = new MultiplayerSyncronizer<Knight, Data>(this, (data: Data) =>{

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
            let inventory = script.properties.get("Inventory")
            if (inventory) {

            } else {
                inventory = []
            }
            return {
                inventory: [],
                position: this.transform.pos,
                componentId: array
            }
        }, (currtime: number, timestamp: number, data) => {
            let total = timestamp - sync.time
            let elapsed = currtime - sync.time
            let dt = elapsed / total


            let component = data as unknown as MultiplayerSyncronizer<Knight,Data>
            if (component.data && sync.data) {
                transform.pos.x = lerp(transform.pos.x, component.data.position.x, dt)
                transform.pos.y = lerp(transform.pos.y, component.data.position.y, dt)
            }
        })
        

        this.components.push(transform, sprite, script, sync)
        
        
        
    }
    clone(): Entity {
        return new Knight()
    }

}
function lerp(init: number, future: number, dt : number) {
    let returned = (1- dt) * init + dt * future

    return returned
}