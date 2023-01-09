import { Component } from "../../../engine/src/types/components.js";
import { Scene } from "../../../engine/src/types/scene.js";
import { Entity } from "../../../engine/src/types/Entity.js";
import { Transform } from "../../../engine/src/components/Physics/transform.js";

import {  Sprite } from "../../../engine/src/components/Graphics/renderable.js";
import { Rectangle } from "../../../engine/src/components/Graphics/Rectangle.js";
import { MouseListener } from "../../../engine/src/components/Event/Listener.js";

export class Player implements Entity{
    components: Component[];
    id?: number | undefined;
    scene?: Scene | undefined;

    transform: Transform
    renderer: Rectangle
    listener: MouseListener
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
        var func = () => {
            this.transform.pos.x = 0
            this.transform.pos.y = 0
            
    }
        
        this.renderer = new Rectangle(this, this.transform)
        this.listener = new MouseListener(this, 
        {
            "click": func,
            "test2": () => {console.log("test2")}
        })
        this.components = [
            this.transform,
            this.renderer,
            this.listener
        ]
       
    }
    

}