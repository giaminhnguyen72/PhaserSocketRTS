import { removeEntity } from "../../../engine/src/core/sceneUtils.js";
import { MouseListener } from "../../../engine/src/components/Event/Listener.js";
import { Sprite } from "../../../engine/src/components/Graphics/Sprite.js";
import { Transform } from "../../../engine/src/components/Physics/transform.js";
import { Scene } from "../../../engine/src/core/scene.js";
import { Component } from "../../../engine/src/types/components.js";
import { Entity } from "../../../engine/src/types/Entity.js";

export class Templar implements Entity {
    components: Component[] = [
        new Sprite(this,new Transform(this,{x:0,y:0,z:20}), "/images/Templar.png")
    ];
    id?: number | undefined;
    scene?: Scene | undefined;
}
