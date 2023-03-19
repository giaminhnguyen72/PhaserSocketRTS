import { Scene } from "../../../engine/src/core/scene.js";
import { Component } from "../../../engine/src/types/components.js";
import { Entity } from "../../../engine/src/types/Entity.js";
import { Text } from "../../../engine/src/components/Graphics/Text.js";
export class Label implements Entity {
    text: Text = new Text("test")
    components: Component[] = [this.text];
    id?: number | undefined;
    scene?: Scene | undefined;
    className: string ="Label";
    
}