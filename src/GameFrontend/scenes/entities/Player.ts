import { Collideable, Component } from "../../../engine/src/types/components.js";
import { Scene } from "../../../engine/src/core/scene.js";
import { Entity } from "../../../engine/src/types/Entity.js";
import { Transform } from "../../../engine/src/components/Physics/transform.js";

import {  Sprite } from "../../../engine/src/components/Graphics/Sprite.js";
import { Rectangle } from "../../../engine/src/components/Graphics/Rectangle.js";
import { MouseListener } from "../../../engine/src/components/Event/Listener.js";
import { Script } from "../../../engine/src/components/Script/Script.js";
import { Position, Velocity } from "../../../engine/src/types/components/physics/transformType.js";
import { BoxCollider } from "../../../engine/src/components/Collision/Collider.js";
import { addEntity } from "../../../engine/src/core/sceneUtils.js";

export class Player implements Entity{
    components: Component[];
    id?: number | undefined;
    scene?: Scene | undefined;

    transform: Transform
    renderer: Rectangle
    listener: MouseListener
    constructor(pos: Position, vel: Velocity) {

        this.transform = new Transform(
            this,
        pos, 
        vel
        )
        var func = () => {
            
            this.transform.vel.x *= -1* Math.random()  * 2
            this.transform.vel.y *= -1* Math.random() * 2
    }
        var script:Script = new Script((dt) => {
            var topRight = this.transform.pos.x + 20
            console.log("In Player Script")

            if (this.transform.pos.x < 0 ) {

                this.transform.pos.x = 0
                this.transform.vel.x *= -1 *  Math.random() * 2

                
            } else if ((this.transform.pos.x + 20) > 1000) {
                this.transform.pos.x = 1000 - 20
                this.transform.vel.x *= -1* Math.random()  * 2

            }
            if (this.transform.pos.y < 0){
                this.transform.pos.y = 0
                this.transform.vel.y *= -1* Math.random() * 2
            } else if ((this.transform.pos.y + 20) > 500) {
                this.transform.pos.y = 500 - 20
                this.transform.vel.y *= -1 * Math.random() * 2
            }
        })
        this.renderer = new Rectangle(this, this.transform)
        this.listener = new MouseListener(this, 
        {
            "click": func,
            "test2": () => {}
        })
        var colliderCallback = (coll: Collideable) => {
            this.transform.vel.x *= -1
            this.transform.vel.y *= -1
        }
        let sprite: Sprite = new Sprite(this,this.transform, "/images/Knight_Forward.png")
        var collider: BoxCollider = new BoxCollider(this, this.transform.pos,colliderCallback)
        this.components = [
            this.transform,
            sprite,
            script,this.listener
        ]
       
    }
    

}