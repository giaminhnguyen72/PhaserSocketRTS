import { Script } from "../components/Script/Script.js";
import { System } from "../types/system.js";
export class ScriptingEngine implements System<Script> {
    tag: string ="SCRIPTING"  ;
    components: Script[];
    constructor() {
        this.components = []
    }
    update(dt: number): void {
        console.log("Scripting engine running")
        for (var comp of this.components) {
            console.log("Component running")
            comp.callback(dt)
        }
    }

}