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
import { addEntity } from "../../../engine/src/core/sceneUtils.js";
import { Templar } from "./Templar.js";
import { EngineType } from "../../../engine/src/constants/engineType.js";
import { KeyboardListener } from "../../../engine/src/components/Event/Keyboard.js";

export class Player implements Entity{
    components: Component[];
    id?: number | undefined;
    scene?: Scene | undefined;
    className: string = "Player"
    listener!: KeyboardListener
    constructor(pos: Position={x:Math.random() * 200,y:Math.random() * 200,z:0}, vel: Velocity={x: Math.random() *  2 - 1, y: Math.random() * 2 - 1,z: 0}) {

        
        let colliderCallback = (coll: Collideable) => {

        }
        let collider: BoxCollider = new BoxCollider(-1,{length:64, height:64}, pos,colliderCallback)
        let sprite: Sprite = new Sprite(-1, collider.shape, "/images/Knight_Forward.png")
        let transform: Transform = new Transform(-1, pos, vel)
        let script: Script = new Script((dt:number) => {
            if (transform.pos.x < 0) {
                transform.pos.x = 0
                transform.vel.x *= -1
            }
            if (transform.pos.x + collider.shape.dim.length > 300) {
                transform.pos.x = 150
                transform.vel.x *= -1
            }
            if (transform.pos.y < 0) {
                transform.pos.y = 0
                transform.vel.y *= -1
            }
            if (transform.pos.y + + collider.shape.dim.height  > 300) {
                transform.pos.y = 150
                transform.vel.y *= -1
            }
        }, EngineType.SOCKETSERVER)
        let listener = new MouseListener({"click": (click) => {
            console.log("Click")
        }})

        this.components = [
            transform,
            sprite,
            collider,
            script,
            listener
        ]
       
    }
    

}