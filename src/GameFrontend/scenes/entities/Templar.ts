
import { MouseListener } from "../../../engine/src/systems/events/components/MouseHandler.js";
import { Sprite } from "../../../engine/src/systems/graphics/components/2d/Sprite.js";
import { Transform } from "../../../engine/src/systems/physics/components/transform.js";
import { Scene } from "../../../engine/src/core/scene.js";
import { Component } from "../../../engine/src/types/components.js";
import { Entity } from "../../../engine/src/types/Entity.js";
import { Script } from "../../../engine/src/systems/scripting/components/Script.js";
import { Rectangle } from "../../../engine/src/types/components/collision/shape.js";
import { Position } from "../../../engine/src/types/components/physics/transformType.js";
import { MainScene } from "../MainScene.js";
import { SwordAttack } from "./SwordAnim.js";
import { Sprite3d } from "../../../engine/src/systems/graphics/components/3d/Sprite3d.js";

export class Templar implements Entity {
    className: string = "Templar"
    transform: Transform = new Transform({x: 0,y: 0,z:20}, {x:0, y: 0, z:2})
    sprite: Sprite3d = new Sprite3d({pos: this.transform.pos, dim:{length:64, height: 64}, rot: 0}, "/images/Templar.png")
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


    }
    clone() {
        return new SwordAttack()
    }
    
}
  