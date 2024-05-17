// Skill ID
// Image Path
// Skill Cost
// Unlocked or not,
//Skills[]

import { Scene } from "../../../../engine/src/core/scene.js"
import { Component } from "../../../../engine/src/types/components.js"
import { Entity } from "../../../../engine/src/types/Entity.js"

type Fist = [0, "", 0, true, []]
type SkillClass = (Skill & (new() => Skill))
interface Skill {
    properties: [string,number, number, boolean, SkillClass[]]
    
}
class FistUI implements Skill {
    properties: [string,number, number, boolean, SkillClass[]] = 
    [
        
        "",
        0,
        0,
        true,
        [],
    ]
    constructor() {

    }
    
}

class SwordHalfSwingUI implements Skill {
    properties: [string,number, number, boolean, SkillClass[]] = 
    [
        
        "",
        0,
        0,
        false,
        [],
    ]
    constructor() {

    }
    
}
class UI implements Skill {
    properties: [string,number, number, boolean, SkillClass[]] = 
    [
        
        "",
        0,
        0,
        false,
        [],
    ]
    constructor() {

    }
    
}

class SkillTree implements Entity {
    components: Component[] = []
    id?: number | undefined
    scene?: Scene | undefined
    className: string = "SKILLTREE"
    skill: Skill = new FistUI()
    // Arry of unlocked skills
    constructor(unlocked: Set<number>) {
        for (let i of this.skill.properties[4]) {
            this.createSkillComponent(i, unlocked)

        }
    }
    createSkillComponent(skill:SkillClass, unlockedSkills: Set<number>) {

    }
    
}

