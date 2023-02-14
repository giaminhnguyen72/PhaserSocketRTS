import { MouseListener } from "../../../engine/src/components/Event/Listener.js";
import { Camera } from "../../../engine/src/components/Graphics/Camera.js";
import { Scene } from "../../../engine/src/core/scene.js";
import { Component } from "../../../engine/src/types/components.js";
import { Entity } from "../../../engine/src/types/Entity.js";

export class MainCamera implements Entity{
    camera: Camera = new Camera(this)
    components: Component[] = [this.camera, new MouseListener(this, {
        "w": () => {
            this.camera.transform.pos.y -= 1
        },
        "a": ()=> {
            this.camera.transform.pos.x -= 1
        },
        "d": () => {
            this.camera.transform.pos.x += 1
        },
        "s": () => {
            this.camera.transform.pos.y += 1
        }
    })];
    id?: number | undefined;
    scene?: Scene | undefined;

}