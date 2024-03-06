import { TimedSpriteSheet } from "../../../../engine/src/systems/graphics/components/2d/Spritesheet.js";
import { Scene } from "../../../../engine/src/core/scene.js";
import { Component, SocketListener } from "../../../../engine/src/types/components.js";
import { Entity } from "../../../../engine/src/types/Entity.js";
import { Transform } from "../../../../engine/src/systems/physics/components/transform.js";
import { MouseListener } from "../../../../engine/src/systems/events/components/MouseHandler.js";
import { Camera } from "../../../../engine/src/systems/graphics/components/2d/Camera.js";
import { Script } from "../../../../engine/src/systems/scripting/components/Script.js";
import { EngineType } from "../../../../engine/src/constants/engineType.js";

import { KeyboardListener } from "../../../../engine/src/systems/events/components/KeyboardHandler.js";
import { MainScene } from "../../MainScene.js";
import { BoxCollider } from "../../../../engine/src/systems/Collision/components/Collider.js";
import { Sprite3d } from "../../../../engine/src/systems/graphics/components/3d/Sprite3d.js";
import { MultiplayerSyncronizer } from "../../../../engine/src/systems/MultiplayerClient/components/Syncronizer.js";
import { Vector3 } from "../../../../engine/src/types/components/physics/transformType.js";
import { lerp } from "../../../../engine/src/math/Vector.js";
type Data = {
    componentId: number[],
    vel: Vector3,
    position: Vector3

}
export class Fireball implements Entity {
    components: Component[];
    id?: number | undefined;
    scene?: Scene | undefined;
    className: string = "FIREBALL";
    constructor(pos: Vector3 = {x:0, y:0, z:0}, dir: Vector3= {x:0,y:0,z:0}) {
        let vel = {x: dir.x* 0.2, y: dir.y * 0.2,z:0}
        let transform = new Transform(pos, vel)
        let sprite = new Sprite3d({
            dim:{
                length: 32,
                height:32
            },
            rot: 0,
            pos: transform.pos

    }, "/images/SwordSpriteSheet.png")
    let sync = new MultiplayerSyncronizer<Fireball, Data>(this, (data: Data) =>{

        //script.properties.set("Destination", data.destination)
        transform.pos.x = data.position.x
        transform.pos.y = data.position.y
        transform.vel.x = data.vel.x
        transform.vel.y = data.vel.y
        for (let i = 0; i < data.componentId.length; i++) {
            this.components[i].componentId = data.componentId[i]
        }
    }, ()=> {
        let array = []
        for (let i of this.components) {
            array.push(i.componentId as number)
        }

        return {
            vel: transform.vel,
            position: transform.pos,
            componentId: array,

        }
    }, (currtime: number, timestamp: number, data) => {
        let total = timestamp - sync.time
        let elapsed = currtime - sync.time
        let dt = elapsed / total
        console.log("Test")

        let component = data 
        if (component.data && sync.data) {
            transform.pos.x = lerp(transform.pos.x, component.data.position.x, dt)
            transform.pos.y = lerp(transform.pos.y, component.data.position.y, dt)
        }
    })
        let script = new Script(this.className,EngineType.SOCKETSERVER)
        script.properties.set("Duration", 0)
        script.setCallBack((dt) => {
            console.log("Updating")
            let dur = script.properties.get("Duration")
            if (dur!= undefined && dur != null) {

                if (dur >= 5000) {
                    console.log("Entity" + script.entity)
                    for (let i of this.components) {
                        console.log("Component ID: " +i.componentId)
                    }
                    
                    script.removeEntity(this.id as number)
                } else {
                    script.properties.set("Duration", dur + dt)
                    console.log(dur)
                }
            }
        })

        // Needs colllider
        this.components = [sprite, transform,sync,script]


    }
    clone(): Entity {
        throw new Error("Method not implemented.");
    }

}