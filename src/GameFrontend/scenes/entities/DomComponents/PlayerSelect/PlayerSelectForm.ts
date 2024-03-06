import { OrthographicCamera3d } from "../../../../../engine/src/systems/graphics/components/3d/OrthographicCamera3d.js";
import { Scene } from "../../../../../engine/src/core/scene.js";
import { Component } from "../../../../../engine/src/types/components.js";
import { Entity } from "../../../../../engine/src/types/Entity.js";
import { UIComponent } from "../../../../../engine/src/systems/graphics/components/3d/DoMRenderer.js";
import { UIListener } from "../../../../../engine/src/systems/events/components/UIListener.js";

export class PlayerUIForm implements Entity{
    components: Component[] = [];
    id?: number | undefined;
    scene?: Scene | undefined;
    className: string = "UIForm";

    constructor() {
        let redButton = new UIComponent(0.5, 0.5, {x:0, y:0, z: 0}, 1, 0xff00)
        let camera = new UIComponent(0.5, 0.5, {x:0, y:0, z: 1}, 0, 0x333d17, redButton)
        let UI = new UIListener(camera.boundingBox, () => {camera.setMaterial({color:0xffff00})})
        this.components.push(camera, UI)
    }
    clone(): Entity {
        throw new Error("Method not implemented.");
    }

}