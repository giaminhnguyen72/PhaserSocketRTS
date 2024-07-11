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
import { ScriptingEngine } from "../../../../engine/src/systems/scripting/ScriptingEngine.js";
import { ExpEvent } from "../../../../GameFrontend/events/ExpEvent.js";

type Data = {
    componentId: number[],
    vel: Vector3,
    position: Vector3
    rot: number,
    direction: number
}
export class SwordSwing implements Entity {
    components: Component[];
    id?: number | undefined;
    scene?: Scene | undefined;
    className: string = "SWORDSWING";
    constructor(owner: number =0, pivot: Vector3 = {x:0, y:0, z:0}) {

        let axis = {
            x: pivot.x ,
            y: pivot.y ,
            z: pivot.z
        }
        let pos = {
            x: pivot.x ,
            y: pivot.y ,
            z: pivot.z
        }
        let transform = new Transform(pos)
        let sprite = new Sprite3d( {
            dim:{
                length: 64,
                height: 64
            },
            rot: 0,
            pos: transform.pos

    }, "/images/Projectiles/Sword.png")
    let sync = new MultiplayerSyncronizer<SwordSwing, Data>(this, (data: Data) =>{

        //script.properties.set("Destination", data.destination)
        transform.pos.x = data.position.x
        transform.pos.y = data.position.y
        transform.vel.x = data.vel.x
        transform.vel.y = data.vel.y

        for (let i = 0; i < data.componentId.length; i++) {
            console.log(data.componentId.length)
            console.log(this.components)
            this.components[i].componentId = data.componentId[i]
        }
    }, ()=> {
        let array = []
        for (let i of this.components) {
            array.push(i.componentId as number)
        }
        
        let rot = script.properties.get("Angle")
        return {
            vel: transform.vel,
            position: transform.pos,
            componentId: array,
            rot: rot,
            direction: script.get("Direction")
        }
    }, (currtime: number, timestamp: number, data) => {
        let total = timestamp - sync.time
        let elapsed = currtime - sync.time
        let dt = elapsed / total
        

        let component = data 
        
        if (component.data && sync.data) {
            if (component.data.direction >= 0) {
                sprite.shape.rot = component.data.rot - 3 * Math.PI / 2
            } else {
                sprite.shape.rot = component.data.rot - 3 * Math.PI / 2
            }
            
            transform.pos.x = lerp(transform.pos.x, component.data.position.x, dt)
            transform.pos.y = lerp(transform.pos.y, component.data.position.y, dt)
        }
    })
        let script = new Script(this.className,EngineType.SOCKETSERVER)
        script.properties.set("Duration", 5000)
        script.properties.set("Owner", owner)
        
        //Spinning Components
        script.properties.set("Radius", 128)
        script.properties.set("Position", pos)
        script.properties.set("Axis", axis)
        script.properties.set("Angle", 3 *Math.PI / 2)
        script.set("Direction", 1)
        // TIme is a constant value that never changes representing the the amount of time to do one rotation
        script.properties.set("Time", 500)

        script.setInit((system) => {
            system.addSuperClasses(script, "Projectile", "Spinning")
        })


        // Needs colllider
        this.components = [sprite, transform,sync,script]


    }
    clone(): Entity {
        throw new Error("Method not implemented.");
    }

}