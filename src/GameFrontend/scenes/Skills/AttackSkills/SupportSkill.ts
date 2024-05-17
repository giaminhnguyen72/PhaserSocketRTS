import { Scene } from "../../../../engine/src/core/scene.js";
import { Script, ScriptObject } from "../../../../engine/src/systems/scripting/components/Script.js";


export function HealSkill(script: ScriptObject, scene:Scene) {
    let hp = script.properties.get("HP")
    if (hp) {
        script.properties.set("HP", hp + 20)
    }
}
export function RegenSkill(script: ScriptObject, scene: Scene) {
    let effects = script.properties.get("Effects")
    if (effects) {
        effects.push(0)
    }
}