import { Scene } from "../../../engine/src/core/scene.js";
import { Script, ScriptObject } from "../../../engine/src/systems/scripting/components/Script.js";
import { Fireball } from "../entities/Attacks/Fireball";


import { AxeSwingSkill, AxeTornado, BarricadeSkill, BowSkill, BubbleSkill, EnergyBlastSkill, FireballCircleSkill, FireballSkill, FireboltSkill, FirebulbSkill, FistSkill, HealBallSkill, IcicleSkill, KnifeSkill, KnifeStabSkill, LavaPoolSkill, LightningSkill, RockThrowSkill, SlowballSkill, SnowballSkill, SwordSkill, SwordSlashSkill, WindSlashSkill } from "./AttackSkills/ProjectileSkills.js";
import { BandageSkill, HealSkill, RageSkill, RegenSkill } from "./AttackSkills/SupportSkill.js";

export function checkStamina(script:ScriptObject, cost: number) {
    let Stamina = script.get("Stamina")

    if (Stamina < cost) {
        return false
    } else {
        script.set("Stamina", Stamina - cost)
        return true
        
    }
}
export function FindSkill(skillID:number,  script: ScriptObject, scene: Scene) {
    let cooldown = script.get("Cooldown")
    
    if (cooldown < 250) {
        return
    }
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
            RegenSkill(script,scene)
            break
        case 6:
            // Stamina break
            //Increases Stamina decrease speed
            break
        case 7:
            //Shoot Arrow
            BowSkill(script, scene)
            break
        case 8: 
            // HealBall
            HealBallSkill(script,scene)
            break
        case 9:
            //Dark Orb
            // Has black hole effects?
            break
        case 10:
            //Knife Throw
            KnifeSkill(script,scene)
            break
        case 11:
            //knife stab
            KnifeStabSkill(script,scene)
            break
        case 12:
            //Axe swing
            AxeSwingSkill(script, scene)
            break
        case 13:
            //Axes Slash (sme circle)
            AxeTornado(script,scene)
            break
        case 14:
            //Hammer swing
            break
        case 15:
            //Hammer Earthquake
            break
        case 16:
            //Icicle Attack
            IcicleSkill(script,scene)
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
            EnergyBlastSkill(script,scene)
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
            // Bear Trap
        
            break
        case 26:
            // Web AOE
            break
        case 27:
            // Heal Pool
            break
        case 28:

        case 29: 
            // Summon minions
        case 30:
            //snowball
            SnowballSkill(script,scene)
            break
        case 31:
            //Slowball
            SlowballSkill(script,scene)
            break
        case 33: 
            //Bandages
            BandageSkill(script,scene)
            break
        case 34:
            //Barricade
            BarricadeSkill(script,scene)
            break
        case 35:
            //Rock Throw
            RockThrowSkill(script,scene)
            break
        case 36:
            //Magma Pool
            LavaPoolSkill(script,scene)
            break
        case 37: 
            // Circle of Fire balls
            // Spinng fireball'
            FireballCircleSkill(script,scene)
            break
        case 38:
            //Rage
            RageSkill(script,scene)
            break
        case 39:
            //Lightnign
            LightningSkill(script,scene)
            break
        case 40:
            // Katana
        case 41:
            // Firebulb
            FirebulbSkill(script,scene)
            break
        case 42:
            // Windslash
            WindSlashSkill(script,scene)
            break
        case 43:
            //Bubble
            BubbleSkill(script,scene)
            break
        case 44: 
            //Sword Stab
        case 45:
            //Fireball
            FireballSkill(script,scene)
            break
        default:
            

        

    }
    script.set("Cooldown", 0)
}