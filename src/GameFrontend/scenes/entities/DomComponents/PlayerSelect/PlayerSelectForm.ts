import { OrthographicCamera3d } from "../../../../../engine/src/systems/graphics/components/3d/OrthographicCamera3d.js";
import { Scene } from "../../../../../engine/src/core/scene.js";
import { Component } from "../../../../../engine/src/types/components.js";
import { Entity } from "../../../../../engine/src/types/Entity.js";
import { UIComponent } from "../../../../../engine/src/systems/graphics/components/3d/DoMRenderer.js";

export class PlayerUIForm implements Entity{
    components: Component[] = [];
    id?: number | undefined;
    scene?: Scene | undefined;
    className: string = "UIForm";

    constructor(orthoCamera: OrthographicCamera3d) {
        let camera = new UIComponent(800, 100, {x:0, y:0, z:orthoCamera.pos.z},orthoCamera)
        this.components.push(camera)
    }
    clone(): Entity {
        throw new Error("Method not implemented.");
    }

}