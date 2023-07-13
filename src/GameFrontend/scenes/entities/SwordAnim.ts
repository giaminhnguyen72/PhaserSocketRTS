import { TimedSpriteSheet } from "../../../engine/src/components/Graphics/Spritesheet.js";
import { Scene } from "../../../engine/src/core/scene.js";
import { Component } from "../../../engine/src/types/components.js";
import { Entity } from "../../../engine/src/types/Entity.js";

export class SwordAnim implements Entity{
    components: Component[] = [new TimedSpriteSheet("/images/SwordSpriteSheet.png", {dim: {length: 32, height: 32}, pos: {x: 20, y: 20, z: 0}, rot: 0}, 3, 32)];
    id?: number | undefined;
    scene?: Scene | undefined;
    className: string = "SWORDANIM";

}