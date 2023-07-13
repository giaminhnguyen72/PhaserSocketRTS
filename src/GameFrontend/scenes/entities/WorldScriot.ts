import { EngineType } from "../../../engine/src/constants/engineType.js";
import { Script } from "../../../engine/src/components/Script/Script.js";
import { Scene } from "../../../engine/src/core/scene.js";
import { Component } from "../../../engine/src/types/components.js";
import { Entity } from "../../../engine/src/types/Entity.js"
import { Label } from "./Label.js";
import {Templar} from "./Templar.js"
import { MouseListener } from "../../../engine/src/components/Event/Listener.js";
import { Player } from "./Player.js";
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
        var func1 = () => {
            if (this.scene) {
                for (let i = 0; i < 5; i++) {
                    this.scene.addEntity(this.scene, new Player({x: Math.random() * 100, y:Math.random() *100, z:0}, {x: Math.random() * 3 -1, y: Math.random() * 3 - 1, z:0}))
                }
                
            }

    }
        let listener = new MouseListener(
            {
                "click": func1,
                "test2": () => {}
            })
        let bounds = new Script((dt) => {
            var topRight = paladin.transform.pos.x + 20


            if (paladin.transform.pos.x < 0 ) {

                paladin.transform.pos.x = 0
                paladin.transform.vel.x *= -1 

                
            } else if ((paladin.transform.pos.x + 20) > 1000) {
                paladin.transform.pos.x = 1000 - 20
                paladin.transform.vel.x *= -1

            }
            if (paladin.transform.pos.y < 0){
                paladin.transform.pos.y = 0
                paladin.transform.vel.y *= -1
            } else if ((paladin.transform.pos.y + 20) > 500) {
                paladin.transform.pos.y = 500 - 20
                paladin.transform.vel.y *= -1 
            }
        }, EngineType.SOCKETCLIENT)
        let script = new Script(func,EngineType.SOCKETSERVER)
        this.components.push(script,bounds, listener )
    }
    
}
function callback(dt: number) {

}