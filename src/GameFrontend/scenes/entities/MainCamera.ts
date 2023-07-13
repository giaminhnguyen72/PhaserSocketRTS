import { Script } from "../../../engine/src/components/Script/Script.js";
import { MouseListener } from "../../../engine/src/components/Event/Listener.js";
import { Camera } from "../../../engine/src/components/Graphics/Camera.js";
import { Scene } from "../../../engine/src/core/scene.js";
import { Component } from "../../../engine/src/types/components.js";
import { Entity } from "../../../engine/src/types/Entity.js";
import { EngineType } from "../../../engine/src/constants/engineType.js";
import { KeyboardListener, KeyEvent } from "../../../engine/src/components/Event/Keyboard.js";

export class MainCamera implements Entity{
    camera: Camera = new Camera(-1, 1000, 500)
    className: string = "MainCamera";
    id?: number | undefined;
    scene?: Scene | undefined;
    components: Component[] = [this.camera, new KeyboardListener({
        "keydown": (event:KeyEvent) => {
            if (event.key == "w") {
                this.camera.transform.y -= 1
            console.log("W is pressed" )
            } else if (event.key == "a") {
                this.camera.transform.x -= 1
            } else if (event.key == "d") {
                this.camera.transform.x += 1
            } else {
                this.camera.transform.y += 1
            }
        }
    })];


}