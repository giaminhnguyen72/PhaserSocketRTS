
import { Scene } from "../../../../engine/src/core/scene.js";
import { Component} from "../../../../engine/src/types/components.js";
import { Entity } from "../../../../engine/src/types/Entity.js";
import { Transform } from "../../../../engine/src/systems/physics/components/transform.js";

import { Script } from "../../../../engine/src/systems/scripting/components/Script.js";
import { EngineType } from "../../../../engine/src/constants/engineType.js";


import { Sprite3d } from "../../../../engine/src/systems/graphics/components/3d/Sprite3d.js";
import { MultiplayerSyncronizer } from "../../../../engine/src/systems/MultiplayerClient/components/Syncronizer.js";
import { Vector3 } from "../../../../engine/src/types/components/physics/transformType.js";
import { lerp } from "../../../../engine/src/math/Vector.js";
import { TimedSpriteSheet3d } from "../../../../engine/src/systems/graphics/components/3d/SpriteSheet3d.js";
type Data = {
    componentId: number[],
    vel: Vector3,
    position: Vector3

}
export class Bubble implements Entity {
    components: Component[];
    id?: number | undefined;
    scene?: Scene | undefined;
    className: string = "BUBBLE";
    constructor(owner: number =0, pos: Vector3 = {x:0, y:0, z:0}, dir: Vector3= {x:0,y:0,z:0}, ) {
        let vel = {x: dir.x* 0.2, y: dir.y * 0.2,z:0}
        let transform = new Transform(pos, vel)
        let sprite = new Sprite3d({
            dim:{
                length: 32,
                height:32
            },
            rot: 0,
            pos: transform.pos

    },"/images/Projectiles/Bubble.png", )
    let sync = new MultiplayerSyncronizer<Bubble, Data>(this, (data: Data) =>{

        //script.properties.set("Destination", data.destination)
        transform.pos.x = data.position.x
        transform.pos.y = data.position.y
        transform.vel.x = data.vel.x
        transform.vel.y = data.vel.y
        for (let i = 0; i < data.componentId.length; i++) {
            this.components[i].componentId = data.componentId[i]
        }
        if (transform.vel.x < 0) {
            sprite.reflect = 1
        } else {
            sprite.reflect = -1
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


        let component = data 
        if (component.data && sync.data) {
            transform.pos.x = lerp(transform.pos.x, component.data.position.x, dt)
            transform.pos.y = lerp(transform.pos.y, component.data.position.y, dt)
        }
    })
        let script = new Script(this.className,EngineType.SOCKETSERVER)
        script.properties.set("Position", transform.pos)
        script.properties.set("Duration", 5000)

        script.properties.set("Owner", owner)
        script.setInit((system) => {
            system.addSuperClasses(script, "Projectile")
        })

        // Needs colllider
        this.components = [sprite, transform,sync,script]


    }
    clone(): Entity {
        throw new Error("Method not implemented.");
    }

}