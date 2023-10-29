import { Collideable, Component } from "../../../engine/src/types/components.js";
import { Scene } from "../../../engine/src/core/scene.js";
import { Entity } from "../../../engine/src/types/Entity.js";
import { Transform } from "../../../engine/src/components/Physics/transform.js";
import { Rectangle as Rect } from "../../../engine/src/types/components/collision/shape.js";
import {  Sprite } from "../../../engine/src/components/Graphics/Sprite.js";
import { Rectangle } from "../../../engine/src/components/Graphics/Rectangle.js";
import { MouseListener } from "../../../engine/src/components/Event/Listener.js";
import { Script } from "../../../engine/src/components/Script/Script.js";
import { Position, Velocity } from "../../../engine/src/types/components/physics/transformType.js";
import { BoxCollider } from "../../../engine/src/components/Collision/Collider.js";
import { Templar } from "./Templar.js";
import { EngineType } from "../../../engine/src/constants/engineType.js";
import { KeyboardListener } from "../../../engine/src/components/Event/Keyboard.js";
import { SceneManager } from "../../../engine/src/core/managers/SceneManager.js";
import { Engine } from "../../../engine/src/core/engine.js";

export class Player implements Entity{
    components: Component[];
    id?: number | undefined;
    scene?: Scene | undefined;
    className: string = "Player"
    listener!: KeyboardListener

    constructor(pos: Position={x:20,y: 20,z:0}, vel: Velocity={x: 0.1, y: 0,z: 0}, engineType: EngineType = EngineType.SOCKETSERVER) {
        
        
        let colliderCallback = (coll: Collideable) => {

        }
        let shape = {dim: {length: 64, height: 64}, rot: 0, pos: pos}
        //let collider: BoxCollider = new BoxCollider(-1,{length:64, height:64}, pos,colliderCallback)
        let sprite: Sprite = new Sprite(-1, shape, "/images/Knight_Forward.png")
        if (engineType == EngineType.SOCKETCLIENT) {
            sprite.rendered = true
            sprite.src = "/images/Templar.png"
        }
        let transform: Transform = new Transform(-1, pos, vel)
        let script: Script = new Script((dt:number) => {
             
            console.log("Script runing")
            
            if (transform.pos.x < 0) {
                transform.pos.x = 0
                transform.vel.x *= -1
                if (engineType == EngineType.SOCKETCLIENT) {
                    console.log(sprite.src)
                    console.log("Client Hit 0: " + Engine.time)
                } else {
                    console.log(sprite.src)
                    console.log("Server Hit 0: " + Engine.time)
                }
                
            }
            if (transform.pos.x + shape.dim.length > 500) {
                if (engineType == EngineType.SOCKETCLIENT) {
                    console.log("Client Hit 500: " + Engine.time)
                } else {
                    console.log("Server Hit 500: " + Engine.time)
                }
                transform.pos.x = 430
                transform.vel.x *= -1
            }
            if (transform.pos.y < 0) {
                transform.pos.y = 0
                transform.vel.y *= -1
            }
            if (transform.pos.y + shape.dim.height  > 300) {
                transform.pos.y = 300
                transform.vel.y *= -1
            }
        }, EngineType.BOTH)
        let listener = new MouseListener({"click": (click) => {
            console.log("Click")
        }})

        this.components = [
            transform,
            sprite,

            script,
            listener
        ]
       
    }
    

}