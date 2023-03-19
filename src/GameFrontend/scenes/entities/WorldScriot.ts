import { Script } from "../../../engine/src/components/Script/Script.js";
import { Scene } from "../../../engine/src/core/scene.js";
import { Component } from "../../../engine/src/types/components.js";
import { Entity } from "../../../engine/src/types/Entity.js"
import { Label } from "./Label.js";
import {Templar} from "./Templar.js"
export class WorldScript implements Entity {
    
    components: Component[] = [];
    id?: number | undefined;
    scene!: Scene;
    className: string = "WorldScript";
    time: number = 0
    constructor(label: Label, paladin: Templar) {
        let func = (dt: number) => {
            this.time += dt
            label.text.text = this.time.toString()
            paladin.transform.vel.x = paladin.transform.vel.x  + paladin.transform.accel.x * dt
            paladin.transform.vel.y = paladin.transform.vel.y  + paladin.transform.accel.y * dt
            paladin.transform.vel.z = paladin.transform.vel.z  + paladin.transform.accel.z * dt
    
            paladin.transform.pos.x = paladin.transform.pos.x  + paladin.transform.vel.x * dt
            paladin.transform.pos.y = paladin.transform.pos.y  + paladin.transform.vel.y * dt
            paladin.transform.pos.z = paladin.transform.pos.z  + paladin.transform.vel.z * dt

            
        }
        let bounds = new Script((dt) => {
            var topRight = paladin.transform.pos.x + 20


            if (paladin.transform.pos.x < 0 ) {

                paladin.transform.pos.x = 0
                paladin.transform.vel.x *= -1 *  Math.random() * 2

                
            } else if ((paladin.transform.pos.x + 20) > 1000) {
                paladin.transform.pos.x = 1000 - 20
                paladin.transform.vel.x *= -1* Math.random()  * 2

            }
            if (paladin.transform.pos.y < 0){
                paladin.transform.pos.y = 0
                paladin.transform.vel.y *= -1* Math.random() * 2
            } else if ((paladin.transform.pos.y + 20) > 500) {
                paladin.transform.pos.y = 500 - 20
                paladin.transform.vel.y *= -1 * Math.random() * 2
            }
        })
        let script = new Script(func)
        this.components.push(script,bounds )
    }
    
}
function callback(dt: number) {

}