import { TimedSpriteSheet } from "../../../../engine/src/systems/graphics/components/2d/Spritesheet.js";
import { Scene } from "../../../../engine/src/core/scene.js";
import { Component } from "../../../../engine/src/types/components.js";
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
        script.setProperty("InventoryID", 0 )
        script.setProperty("Destination", {x: 0, y:0})
        script.setInit(() =>{
            let inventory = new Inventory()
            this.scene.addEntity(inventory)
            script.setProperty("InventoryID", inventory.id)
            let bounds  =this.scene.worldBounds

            sprite.visible = true
            collider.visible = true
        })
        
        script.setCallBack((dt: number) => {

            let HP = script.properties.get("HP")
            let Destination = script.properties.get("Destination")
            if (Destination) {
                
                this.transform.moveTowards(Destination, dt, 0.01)
            }
            
            if (HP != undefined && HP != null && HP <= 0) {
                this.scene.removeEntity(this.id as number)
                let inventoryID = script.properties.get("InventoryID")
                if (inventoryID) {
                    this.scene.removeEntity(inventoryID)
                }
                
            }
            


        })
        

        this.components.push(transform, sprite,collider, script)
        
        
        
    }
    clone(): Entity {
        return new Knight()
    }

}