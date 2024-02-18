import { TimedSpriteSheet3d } from "../../../engine/src/systems/graphics/components/3d/Spritesheet3d.js";
import { Scene } from "../../../engine/src/core/scene.js";
import { Component } from "../../../engine/src/types/components.js";
import { Entity } from "../../../engine/src/types/Entity.js";
import { Vector3 } from "../../../engine/src/types/components/physics/transformType.js";
import { Script } from ".././../../engine/src/systems/scripting/components/Script.js";
import { EngineType } from "../../../engine/src/constants/engineType.js";
import { BoxCollider } from "../../../engine/src/systems/Collision/components/Collider.js";

export class SwordAttack implements Entity {
    components: Component[] = [];
    id?: number | undefined;
    scene!: Scene;
    className: string = "SWORDANIM";
    constructor(pos: Vector3 = {x: 0, y:0, z:0}) {
        let sprite = new TimedSpriteSheet3d("/images/SwordSpriteSheet.png", {dim: {length: 32, height: 32}, pos: pos, rot: 0}, 50, 32, [5])
        let shape = {
            pos,
            dim: {length: 32, height: 32},
            rot: 0
        }
        let collider = new BoxCollider(shape, (col) => {
            
            if (col.entity && col.entity != this.id) {
                collider.visible = false
                let entity = this.scene?.entities.get(col.entity)
                if (entity) {
                    for (let i of entity.components) {
                        if (i instanceof Script) {
                            let HP = i.properties.get("HP")
                            if (HP) {
                                i.properties.set("HP", HP - 5)
                            }
                        }
                    }
                }
            }
        })
        this.components.push(sprite)

    }
    clone() {
        return new SwordAttack()
    }

}