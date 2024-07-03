import { Regen } from "../../../../GameFrontend/events/Regen.js";
import { Scene } from "../../../../engine/src/core/scene.js";
import { Script, ScriptObject } from "../../../../engine/src/systems/scripting/components/Script.js";
import { Bandage } from "../../entities/Attacks/Bandage.js";
import { checkStamina } from "../SkillNavigation.js";
import { Rage } from "../../../../GameFrontend/events/Rage.js";


export function HealSkill(script: ScriptObject, scene:Scene) {

    let hp = script.get("HP")
    let Stamina = script.get("Stamina")
    script.set("Stamina", Stamina - 20)
    if (hp) {
        script.set("HP", hp + 20)
    }
}
export function RegenSkill(script: ScriptObject, scene: Scene) {
    let entity = script.system.operations.addEntity(script.componentId as number)
    let regen = new Regen()
    let cost = 15
    if (!checkStamina(script,cost)) {
        return
    } 
    regen.duration = 10200
    regen.healAmount = 5
    regen.scriptID = script.componentId as number
    regen.regenTime = 2000

    entity.addComponent<Regen>(Regen, regen)
}




export function RageSkill(script: ScriptObject, scene: Scene) {
    let cost = 30
    if (!checkStamina(script,cost)) {
        return
    } 
    let rageSet = script.system.operations.dataManager.query<Rage>(Rage)
    if (rageSet) {
        let found = false
        rageSet.iterate(([i,rage]) => {
            if (rage.scriptID === script.componentId) {
                rage.totalTime = 0
                found = true

            } 
        })
        if (found == false) {
            console.log("Ragge Added")
            let rage = new Rage()
            rage.duration = 10200
            rage.rageTime = 2000
            rage.staminaAmount = 10
            rage.scriptID = script.componentId as number
            script.system.operations.addEntity(0).addComponent<Rage>(Rage, rage)
        }
    }
}

export function BandageSkill(script: ScriptObject, scene: Scene) {
    console.log("Bandage Skill")
    let cost = 15
    if (!checkStamina(script,cost)) {
        return
    } 
    let bandage1 = new Bandage()
    let angle1 = 2 * Math.PI * Math.random()
    let posX1 = Math.cos(angle1) * 96
    let posY1 = Math.sin(angle1) * 96
    let curr = script.get("Position")
    bandage1.components[1].pos.x = posX1 + curr.x
    bandage1.components[1].pos.y = posY1 + curr.y
    let bandage2 = new Bandage()
    let angle2 = 2 * Math.PI * Math.random()
    let posX2 = Math.cos(angle2) * 96
    let posY2 = Math.sin(angle2) * 96 
    bandage2.components[1].pos.x = posX2 + curr.x
    bandage2.components[1].pos.y = posY2 + curr.y
    scene.addEntity(bandage2)
    scene.addEntity(bandage1)

}
