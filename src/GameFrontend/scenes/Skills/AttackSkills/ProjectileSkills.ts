import { Scene } from "../../../../engine/src/core/scene.js";
import { ScriptObject, Script } from "../../../../engine/src/systems/scripting/components/Script.js";
import { Fireball } from "../../entities/Attacks/Fireball.js";
import { Fist } from "../../entities/Attacks/Fist.js";
import { SwordSlash } from "../../entities/Attacks/SwordSlash.js";
import { SwordSwing } from "../../entities/Attacks/SwordSwing.js";

 
export function FistSkill(script: ScriptObject, scene:Scene) {
    let pos = script.properties.get("Position")
    let direction = script.properties.get("Direction")
    if (pos && direction) {
        let newPos = {
            x: pos.x,
            y:pos.y,
            z: pos.z
        } 
        let fist = new Fist(newPos, direction)
        scene.addEntity(fist)

    }
}
export function FireboltSkill(script: ScriptObject, scene:Scene) {
    let Direction = script.properties.get("Direction")
    let Position = script.properties.get("Position")
    let Owner = script.properties.get("Owner")
    if (Direction && Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let fireball = new Fireball(Owner,item, Direction)
        scene.addEntity(fireball)
    }
}
export function SwordSkill(script: ScriptObject, scene:Scene) {

    let Position = script.properties.get("Position")
    let Owner = script.properties.get("Owner")
    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let fireball = new SwordSwing(Owner, item)
        scene.addEntity(fireball)
    }
      
}
export function SwordSlashSkill(script: ScriptObject, scene:Scene) {

    let Position = script.properties.get("Position")
    let Owner = script.properties.get("Owner")
    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let fireball = new SwordSlash(Owner, item)
        scene.addEntity(fireball)
    }
      
}