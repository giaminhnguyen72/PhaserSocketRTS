import { Scene } from "../../../engine/src/core/scene.js";
import { Script, ScriptObject } from "../../../engine/src/systems/scripting/components/Script.js";
import { Fireball } from "../entities/Attacks/Fireball";


import { AxeSwingSkill, AxeTornado, BarricadeSkill, BearTrapSkill, BowSkill, BubbleSkill, EnergyBlastSkill, FireballCircleSkill, FireballSkill, FireboltSkill, FirebulbSkill, FistSkill, HealBallSkill, IcicleSkill, KnifeSkill, KnifeStabSkill, LavaPoolSkill, LightningSkill, RockThrowSkill, SlowballSkill, SnowballSkill, SwordSkill, SwordSlashSkill, SwordStabSkill, WebSkill, WindSlashSkill } from "./AttackSkills/ProjectileSkills.js";
import { BandageSkill, HealSkill, RageSkill, RegenSkill } from "./AttackSkills/SupportSkill.js";

export function checkStamina(script:ScriptObject, cost: number) {
    let Stamina = script.get("Stamina")

    if (Stamina < cost) {
        return false
    } else {
        script.set("Stamina", Stamina - cost)
        return true
        
    }
}export function UnlockSkill(skillID:number) {

    let cost = 0

    switch (skillID) {
        case 0:
            //Basic Fist
            cost = 0


            break
        case 1:
            cost = 10

            

            break
        case 2: 
            cost = 20


            
            break;
        case 3:
            cost = 30
            break
        case 4:
            //Heal
            cost = 20

            break
        case 5:
            //Regen
            cost = 80
        case 6:
            // Stamina break
            //Increases Stamina decrease speed
            break
        case 7:
            //Shoot Arrow
            cost = 30

        case 8: 
            // HealBall
            cost = 70

        case 9:
            //Dark Orb
            // Has black hole effects?
            break
        case 10:
            //Knife Throw
            cost = 0
            break
        case 11:
            //knife stab
            cost = 50
            break
        case 12:
            //Axe swing
            cost = 40

            break
        case 13:
            //Axes Slash (sme circle)
            cost = 80
            break
        case 14:
            //Hammer swing
            break
        case 15:
            //Hammer Earthquake
            break
        case 16:
            //Icicle Attack
            cost = 40
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
            cost = 30
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
            cost = 20
            break
        case 26:
            // Web AOE
            cost = 70

            break
        case 27:
            // Heal Pool
            break
        case 28:

        case 29: 
            // Summon minions
        case 30:
            //snowball
            cost = 30
            break
        case 31:
            //Slowball
            cost = 40

            break
        case 33: 
            //Bandages
            cost = 60

            break
        case 34:
            //Barricade
            cost = 40

            break
        case 35:
            //Rock Throw
            cost = 30

            break
        case 36:
            //Magma Pool
            cost = 80

            break
        case 37: 
            // Circle of Fire balls
            // Spinng fireball'
            cost = 100

            break
        case 38:
            //Rage
            cost = 150
            break
        case 39:
            //Lightnign
            cost = 50
            break
        case 40:
            // Katana
            break
        case 41:
            // Firebulb
            cost = 15

            break
        case 42:
            // Windslash
            cost = 40
            break
        case 43:
            //Bubble
            cost = 60

            break
        case 44: 
            //Sword Stab
            cost = 50
            break
        case 45:
            //Fireball
            cost = 100

            break
        default:
            cost = -5
            break

        

    }
    return cost

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
            BearTrapSkill(script,scene)
            break
        case 26:
            // Web AOE
            WebSkill(script,scene)
            
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
            SwordStabSkill(script,scene)
            break
        case 45:
            //Fireball
            FireballSkill(script,scene)
            break
        default:
            

        

    }
    script.set("Cooldown", 0)
}