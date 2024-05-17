import { TimedSpriteSheet3d } from "../../../../engine/src/systems/graphics/components/3d/SpriteSheet3d.js";
import { Scene } from "../../../../engine/src/core/scene.js";
import { Component } from "../../../../engine/src/types/components.js";
import { Entity } from "../../../../engine/src/types/Entity.js";
import { Vector3 } from "../../../../engine/src/types/components/physics/transformType.js";
import { Script } from "../.././../../engine/src/systems/scripting/components/Script.js";
import { EngineType } from "../../../../engine/src/constants/engineType.js";
import { BoxCollider } from "../../../../engine/src/systems/Collision/components/Collider.js";
import { Sprite3d } from "../../../../engine/src/systems/graphics/components/3d/Sprite3d.js";

export class BasicAxe implements Entity {
    components: Component[] = [];
    id?: number | undefined;
    scene!: Scene;
    className: string = "BASICAXE";
    constructor(owner: number= 0, pos: Vector3 = {x: 0, y:0, z:0}) {
        let sprite = new TimedSpriteSheet3d("/images/Projectiles/GreatAxe.png", {dim: {length: 128, height: 128}, pos: pos, rot: 0}, 100, 64, [4])
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
        return this
    }

}