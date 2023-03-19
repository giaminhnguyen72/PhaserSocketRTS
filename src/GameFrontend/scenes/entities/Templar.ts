import { removeEntity } from "../../../engine/src/core/sceneUtils.js";
import { MouseListener } from "../../../engine/src/components/Event/Listener.js";
import { Sprite } from "../../../engine/src/components/Graphics/Sprite.js";
import { Transform } from "../../../engine/src/components/Physics/transform.js";
import { Scene } from "../../../engine/src/core/scene.js";
import { Component } from "../../../engine/src/types/components.js";
import { Entity } from "../../../engine/src/types/Entity.js";
import { Script } from "../../../engine/src/components/Script/Script.js";

export class Templar implements Entity {
    className: string = "Templar"
    transform: Transform = new Transform(-1,{x:0,y:0,z:20}, {x:2, y: 2, z:0})
    components: Component[] = [
        new Sprite(-1,this.transform, "/images/Templar.png")
    ];
    id?: number | undefined;
    scene?: Scene | undefined;
}
  