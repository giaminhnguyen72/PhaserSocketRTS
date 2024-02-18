import { Script } from "../../../../../engine/src/systems/scripting/components/Script.js";
import { Scene } from "../../../../../engine/src/core/scene.js";
import { Component } from "../../../../../engine/src/types/components.js";
import { Entity } from "../../../../../engine/src/types/Entity.js";
import { EngineType } from "../../../../../engine/src/constants/engineType.js";


export class Inventory implements Entity {
    components: Component[] = [];
    id?: number | undefined;
    scene?: Scene | undefined;
    className: string = "INVENTORY";
    constructor() {
        let script = new Script(this.className, EngineType.BOTH)
        
        script.setInit(() => {
            script.setProperty("entityID", this.id)
            script.setProperty("items", [])
            script.setProperty("selected", 0)

        })


        this.components.push(script)
    }
    clone() {
        return new Inventory()
    }

}