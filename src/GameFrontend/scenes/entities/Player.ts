import { Component } from "../../../engine/src/types/components.js";
import { Scene } from "../../../engine/src/types/scene.js";
import { Entity } from "../../../engine/src/types/Entity.js";
import { Transform } from "../../../engine/src/components/Physics/transform.js";

import {  Sprite } from "../../../engine/src/components/Graphics/renderable.js";
import { Rectangle } from "../../../engine/src/components/Graphics/Rectangle.js";

export class Player implements Entity{
    components: Component[];
    id?: number | undefined;
    scene?: Scene | undefined;

    transform: Transform
    renderer: Rectangle
    constructor() {
        this.transform = new Transform(
            this,
        {
                x:20,
                y:20,
                z:20
        }, 
        {
            x: 1,
            y: 1,
            z: 0
        }
        )
        
        this.renderer = new Rectangle(this, this.transform)
        
        this.components = [
            this.transform,
            this.renderer
        ]
        
    }
    

}