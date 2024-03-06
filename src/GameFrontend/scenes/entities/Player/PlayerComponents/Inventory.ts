import { Script } from "../../../../../engine/src/systems/scripting/components/Script.js";
import { Scene } from "../../../../../engine/src/core/scene.js";
import { Component } from "../../../../../engine/src/types/components.js";
import { Entity } from "../../../../../engine/src/types/Entity.js";
import { EngineType } from "../../../../../engine/src/constants/engineType.js";
import { FireWandItem } from "../../items/FireWand.js";
import { Transform } from "../../../../../engine/src/systems/physics/components/transform.js";
import { Item } from "../../items/Items.js";
// Will in be in charge of GUI Management
export class Inventory implements Entity {
    components: Component[] = [];
    id?: number | undefined = 0 ;
    scene?: Scene | undefined;
    className: string = "INVENTORY";
    constructor(playerID : number = 0) {
        let script = new Script(this.className, EngineType.SOCKETSERVER)
        
        script.setInit(() => {
            script.setProperty("EntityID", playerID)
            let entity = this.scene?.entities.get(playerID)
            let arr: ( Item| undefined)[]  = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined]

            script.setProperty("Items", arr)
        })
        

        



        this.components.push(script)
    }
    clone() {
        return new Inventory()
    }

}