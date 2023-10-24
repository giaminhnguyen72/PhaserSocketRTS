import { removeEntity } from "../../../engine/src/core/sceneUtils.js";
import { MouseListener } from "../../../engine/src/components/Event/Listener.js";
import { Sprite } from "../../../engine/src/components/Graphics/Sprite.js";
import { Transform } from "../../../engine/src/components/Physics/transform.js";
import { Scene } from "../../../engine/src/core/scene.js";
import { Component } from "../../../engine/src/types/components.js";
import { Entity } from "../../../engine/src/types/Entity.js";
import { Script } from "../../../engine/src/components/Script/Script.js";
import { Rectangle } from "../../../engine/src/types/components/collision/shape.js";
import { Position } from "../../../engine/src/types/components/physics/transformType.js";

export class Templar implements Entity {
    className: string = "Templar"
    transform: Transform = new Transform(-1,{x:Math.random() * 20,y: Math.random() * 30,z:20}, {x:10, y: 10, z:0})
    sprite: Sprite = new Sprite(-1,{pos: this.transform.pos, dim:{length:64, height: 64}, rot: 0}, "/images/Templar.png")
    components: Component[] = [
        this.sprite
    ];
    id?: number | undefined;
    scene?: Scene | undefined;
    constructor(pos?: Position) {
        if (pos) {
            this.transform.pos.x = pos.x
            this.transform.pos.y = pos.y
        }
    }
}
  