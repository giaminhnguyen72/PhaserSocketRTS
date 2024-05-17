
import { MouseListener } from "../../../engine/src/systems/events/components/MouseHandler.js";
import { Sprite } from "../../../engine/src/systems/graphics/components/2d/Sprite.js";
import { Transform } from "../../../engine/src/systems/physics/components/transform.js";
import { Scene } from "../../../engine/src/core/scene.js";
import { Component } from "../../../engine/src/types/components.js";
import { Entity } from "../../../engine/src/types/Entity.js";
import { Script } from "../../../engine/src/systems/scripting/components/Script.js";
import { Rectangle } from "../../../engine/src/types/components/collision/shape.js";
import { Position, Vector3 } from "../../../engine/src/types/components/physics/transformType.js";
import { MainScene } from "../MainScene.js";
import { SwordAttack } from "./SwordAnim.js";
import { Sprite3d } from "../../../engine/src/systems/graphics/components/3d/Sprite3d.js";
import { MultiplayerSyncronizer } from "../../../engine/src/systems/MultiplayerClient/components/Syncronizer.js";
import { lerp } from "../../../engine/src/math/Vector.js";
type Data = {
    componentId: number[],
    position: Vector3
}
export class Templar implements Entity {
    className: string = "Templar"
    transform: Transform = new Transform({x: 0,y: 0,z:5}, {x:0, y: 0, z:0})
    sprite: Sprite3d = new Sprite3d({pos: this.transform.pos, dim:{length:128, height: 128}, rot: 0}, "/images/Templar.png")
    components: Component[] = [
        this.sprite,
        this.transform
    ];
    id?: number | undefined;
    scene?: Scene | undefined;
    constructor(pos?: Position) {
        if (pos) {
            this.transform.pos.x = pos.x
            this.transform.pos.y = pos.y
        }
        let sync = new MultiplayerSyncronizer<Templar, Data>(this, (data: Data) =>{

            //script.properties.set("Destination", data.destination)
            this.transform.pos.x = data.position.x
            this.transform.pos.y = data.position.y
            for (let i = 0; i < data.componentId.length; i++) {
                this.components[i].componentId = data.componentId[i]
            }
        }, ()=> {
            let array = []
            for (let i of this.components) {
                array.push(i.componentId as number)
            }

            return {

                position: this.transform.pos,
                componentId: array
            }
        }, (currtime: number, timestamp: number, data) => {
            let total = timestamp - sync.time
            let elapsed = currtime - sync.time
            let dt = elapsed / total


            let component = data as unknown as MultiplayerSyncronizer<Templar,Data>
            if (component.data && sync.data) {
                this.transform.pos.x = lerp(this.transform.pos.x, component.data.position.x, dt)
                this.transform.pos.y = lerp(this.transform.pos.y, component.data.position.y, dt)
            }
        })
        this.components.push(sync)
        


    }
    clone() {
        return new SwordAttack()
    }
    
}
  