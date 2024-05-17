import { Scene } from "../../../engine/src/core/scene.js";
import { Script, ScriptObject } from "../../../engine/src/systems/scripting/components/Script.js";
import { Fireball } from "../entities/Attacks/Fireball";
import { FireboltSkill, FistSkill, SwordSkill, SwordSlashSkill } from "./AttackSkills/ProjectileSkills.js";
import { HealSkill } from "./AttackSkills/SupportSkill.js";


export function FindSkill(skillID:number,  script: ScriptObject, scene: Scene) {
    switch (skillID) {
        case 0:
            //Basic Fist
            FistSkill(script, scene)
            break
        case 1:
            FireboltSkill(script, scene)
            break
        case 2: 
            SwordSlashSkill(script,scene)
            
            break;
        case 3:
            SwordSkill(script, scene)
            break
        case 4:
            //Heal
            HealSkill(script, scene)
            break
        case 5:
            //Regen

            break
        case 6:
            // Stamina break
            //Increases Stamina decrease speed
            break
        case 7:
            //Shoot Arrow
            break
        case 8: 
            // HealBall
            break
        case 9:
            //Dark Orb
            // Has black hole effects?
            break
        case 10:
            //Knife Throw
            break
        case 11:
            //knife stab
            break
        case 12:
            //Axe swing (Circular)
            break
        case 13:
            //Axes Slash (sme circle)
            break
        case 14:
            //Hammer swing
            break
        case 15:
            //Hammer Earthquake
            break
        case 16:
            //Icicle Attack
            break
        case 17:
            //Range
            break
        case 18:
            //Parry
            break
        case 19:
            //Dash
            break
        case 20:
            //Ki Blast
            break
        case 21:
            //Heal Pool
            break
        case 22:
            //Bullet
            break
        case 23:
            //Shield
            break
        case 24: 
            //Charge up ranged attack?
            break
        case 25: 
            //Some trap
            break
        case 26:
            // Web AOE
            break
        case 27:
            // Heal Pool
            break
        case 28:
            // Spinng fireball
            break
        case 29: 
            // Summon minions

    }
}