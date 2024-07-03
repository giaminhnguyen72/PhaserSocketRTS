import { UIComponent } from "../../../../engine/src/systems/graphics/components/3d/DoMRenderer.js";
import { Scene } from "../../../../engine/src/core/scene.js";
import { Component } from "../../../../engine/src/types/components.js";
import { Entity } from "../../../../engine/src/types/Entity.js";

export class SkillDataPanel implements Entity {
    components: [UIComponent];
    id?: number | undefined;
    scene?: Scene | undefined;
    className: string = "SKILLDATA";
    constructor() {
        let ui = new UIComponent(0.2,2, {x: 0.9, y: 0,z:0},1)
        let image = new UIComponent(0.0625,0.0625,{x:0.95, y: 0.3,z: 0},1)
        let text;
        
        ui.children.push(image)
        this.components = [ui]
    }


}