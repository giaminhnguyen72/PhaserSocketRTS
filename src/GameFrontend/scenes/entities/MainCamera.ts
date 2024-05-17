import { Script } from "../../../engine/src/systems/scripting/components/Script.js";
import { MouseListener } from "../../../engine/src/systems/events/components/MouseHandler.js";
import { Camera } from "../../../engine/src/systems/graphics/components/2d/Camera.js";
import { Scene } from "../../../engine/src/core/scene.js";
import { Component } from "../../../engine/src/types/components.js";
import { Entity } from "../../../engine/src/types/Entity.js";
import { EngineType } from "../../../engine/src/constants/engineType.js";
import { KeyboardListener, KeyEvent } from "../../../engine/src/systems/events/components/KeyboardHandler.js";
import { OrthographicCamera3d } from "../../../engine/src/systems/graphics/components/3d/OrthographicCamera3d.js";

export class MainCamera implements Entity{
    camera: Camera = new OrthographicCamera3d(2000,1000 , {x:0, y:0, z:0})
    className: string = "MainCamera";
    id?: number | undefined;
    scene?: Scene | undefined;
    components: Component[] = [this.camera, new KeyboardListener({
        "keydown": (event:KeyEvent) => {
            if (event.key == "w") {
                this.camera.pos.y -= 100
            console.log("W is pressed" )
            } else if (event.key == "a") {
                this.camera.pos.x -= 100
            } else if (event.key == "d") {
                this.camera.pos.x += 100
            } else if (event.key == "s"){
                this.camera.pos.y += 100
            }
        }
    })];
    constructor() {
        
    }
    clone() {
        return new MainCamera()
    }


}