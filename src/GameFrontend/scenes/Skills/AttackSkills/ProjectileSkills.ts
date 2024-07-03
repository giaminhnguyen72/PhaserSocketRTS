import { Scene } from "../../../../engine/src/core/scene.js";
import { ScriptObject, Script } from "../../../../engine/src/systems/scripting/components/Script.js";
import { Arrow } from "../../entities/Attacks/Arrow.js";
import { EnergyBlast } from "../../entities/Attacks/EnergyBlast.js";
import { Fireball } from "../../entities/Attacks/Fireball.js";
import { Fist } from "../../entities/Attacks/Fist.js";
import { SwordSlash } from "../../entities/Attacks/SwordSlash.js";
import { SwordSwing } from "../../entities/Attacks/SwordSwing.js";
import {Icicle} from "../../entities/Attacks/Icicle.js"
import { HealBall } from "../../entities/Attacks/HealBall.js";
import { Firebulb } from "../../entities/Attacks/Firebulb.js";
import { Windslash } from "../../entities/Attacks/WindSlash.js";
import { Bubble } from "../../entities/Attacks/Bubble.js";
import { Snowball } from "../../entities/Attacks/Snowball.js";
import { Knife } from "../../entities/Attacks/Knife.js";
import { Stone } from "../../entities/Attacks/Stone.js";
import { Barricade } from "../../entities/Attacks/Barricade.js";
import { checkStamina } from "../SkillNavigation.js";
import { FireBlast } from "../../entities/Attacks/Fireblast.js";
import { Slowball } from "../../entities/Attacks/Slowball.js";
import { Lightning } from "../../entities/Attacks/Lightning.js";
import { GreatAxe } from "../../entities/Attacks/AxeSwing.js";
import { LavaPool } from "../../entities/Attacks/LavaPool.js";

 
export function FistSkill(script: ScriptObject, scene:Scene) {
    let pos = script.get("Position")
    let direction = script.get("Direction")

    let cost = 5
    if (!checkStamina(script,cost)) {
        return
    } 

    if (pos && direction) {
        let newPos = {
            x: pos.x + direction.x * 32,
            y:pos.y + direction.y * 32,
            z: pos.z
        } 


        let fist = new Fist(newPos, direction)
        fist.components[3].set("Owner", script.entity)
        scene.addEntity(fist)

    }
}
export function FireboltSkill(script: ScriptObject, scene:Scene) {
    let Direction = script.get("Direction")
    let Position = script.get("Position")
    let Owner =script.entity
    
    let cost = 20
    if (!checkStamina(script,cost)) {
        return
    } 
    
    if (Direction && Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }

        let fireball = new FireBlast()
        fireball.components[3].set("Owner", script.entity)
        fireball.components[1].pos.x  = Position.x + Direction.x * 64
        fireball.components[1].pos.y  = Position.y + Direction.y * 64
        fireball.components[1].vel.x  = Direction.x * 0.4
        fireball.components[1].vel.y  = Direction.y * 0.4
        scene.addEntity(fireball)
    }
}
export function SwordSkill(script: ScriptObject, scene:Scene) {

    let Position = script.get("Position")
    let Owner = script.entity

    let cost = 20
    if (!checkStamina(script,cost)) {
        return
    } 
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

    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")

    let cost = 20
    if (!checkStamina(script,cost)) {
        return
    } 
    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        console.log("Sword Slash")
        let fireball = new SwordSlash(Owner, item)
        if (Direction.x <= 0) {
            fireball.components[3].set("Direction", -1)
        } else {
            fireball.components[3].set("Direction", 1)
        }
        
        scene.addEntity(fireball)
    }
      
}
export function EnergyBlastSkill(script: ScriptObject, scene:Scene) {

    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")

    let cost = 20
    if (!checkStamina(script,cost)) {
        return
    } 
    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let projectile = new EnergyBlast()
        projectile.components[3].set("Owner", Owner)
        projectile.components[1].pos.x  = Position.x + Direction.x * 32
        projectile.components[1].pos.y  = Position.y + Direction.y * 32
        projectile.components[1].pos.z  = Position.z
        projectile.components[1].vel.x  = 0.1 * Direction.x
        projectile.components[1].vel.y  = 0.1 * Direction.y
        scene.addEntity(projectile)
    }
      
}
export function BarricadeSkill(script: ScriptObject, scene:Scene) {

    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")
    let Stamina = script.get("Stamina")
    let cost = 40
    if (!checkStamina(script,cost)) {
        return
    } 
    if (Position) {

        let projectile = new Barricade()
        projectile.components[3].set("Owner", Owner)
        projectile.components[1].pos.x  = Position.x + Direction.x * 32
        projectile.components[1].pos.y  = Position.y + Direction.y * 32
        projectile.components[1].pos.z  = Position.z
        scene.addEntity(projectile)
    }
}
export function BowSkill(script: ScriptObject, scene:Scene) {

    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")
    let cost = 15
    if (!checkStamina(script,cost)) {
        return
    } 
    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let projectile = new Arrow()
        projectile.components[3].set("Owner", Owner)
        projectile.components[1].pos.x  = Position.x + Direction.x * 32
        projectile.components[1].pos.y  = Position.y + Direction.y * 32
        projectile.components[1].pos.z  = Position.z
        projectile.components[1].vel.x  = 0.1 * Direction.x
        projectile.components[1].vel.y  = 0.1 * Direction.y
        scene.addEntity(projectile)
    }
      
}
export function IcicleSkill(script: ScriptObject, scene:Scene) {

    let Position = script.get("Position")

    let Direction = script.get("Direction")
    let cost = 20
    if (!checkStamina(script,cost)) {
        return
    } 
    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let projectile = new Icicle()
        projectile.components[3].set("Owner", script.entity)
        projectile.components[1].pos.x  = Position.x + Direction.x * 64
        projectile.components[1].pos.y  = Position.y + Direction.y * 64
        projectile.components[1].pos.z  = Position.z
        projectile.components[1].vel.x  = 0.2 * Direction.x
        projectile.components[1].vel.y  = 0.2 * Direction.y
        scene.addEntity(projectile)
    }
      
}

export function WindSlashSkill(script: ScriptObject, scene:Scene) {

    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")
    let cost = 20
    if (!checkStamina(script,cost)) {
        return
    } 

    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let projectile = new Windslash()
        projectile.components[3].set("Owner", Owner)
        projectile.components[1].pos.x  = Position.x + Direction.x * 32
        projectile.components[1].pos.y  = Position.y + Direction.y * 32
        projectile.components[1].pos.z  = Position.z
        projectile.components[1].vel.x  = 0.1 * Direction.x
        projectile.components[1].vel.y  = 0.1 * Direction.y
        scene.addEntity(projectile)
    }
      
}
export function KnifeSkill(script: ScriptObject, scene:Scene) {

    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")
    let cost = 30
    if (!checkStamina(script,cost)) {
        return
    } 
    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let projectile = new Knife()
        projectile.components[3].set("Owner", Owner)
        projectile.components[1].pos.x  = Position.x + Direction.x * 32
        projectile.components[1].pos.y  = Position.y + Direction.y * 32
        projectile.components[1].pos.z  = Position.z
        projectile.components[1].vel.x  = 0.1 * Direction.x
        projectile.components[1].vel.y  = 0.1 * Direction.y
        scene.addEntity(projectile)
    }
      
}
export function BubbleSkill(script: ScriptObject, scene:Scene) {

    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")
    let cost = 20
    if (!checkStamina(script,cost)) {
        return
    } 
    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let projectile = new Bubble()
        projectile.components[3].set("Owner", Owner)
        projectile.components[1].pos.x  = Position.x + Direction.x * 32
        projectile.components[1].pos.y  = Position.y + Direction.y * 32
        projectile.components[1].pos.z  = Position.z
        projectile.components[1].vel.x  = 0.1 * Direction.x
        projectile.components[1].vel.y  = 0.1 * Direction.y
        scene.addEntity(projectile)
    }
      
}
export function FireballSkill(script: ScriptObject, scene:Scene) {

    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")
    let cost = 20
    if (!checkStamina(script,cost)) {
        return
    } 
    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let projectile = new Fireball()
        projectile.components[3].set("Owner", Owner)
        projectile.components[1].pos.x  = Position.x + Direction.x * 32
        projectile.components[1].pos.y  = Position.y + Direction.y * 32
        projectile.components[1].pos.z  = Position.z
        projectile.components[1].vel.x  = 0.1 * Direction.x
        projectile.components[1].vel.y  = 0.1 * Direction.y
        scene.addEntity(projectile)
    }
      
}
export function HealBallSkill(script: ScriptObject, scene:Scene) {

    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")
    let cost = 15
    if (!checkStamina(script,cost)) {
        return
    } 
    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let projectile = new HealBall()
        projectile.components[3].set("Owner", Owner)
        projectile.components[1].pos.x  = Position.x + Direction.x * 32
        projectile.components[1].pos.y  = Position.y + Direction.y * 32
        projectile.components[1].pos.z  = Position.z
        projectile.components[1].vel.x  = 0.1 * Direction.x
        projectile.components[1].vel.y  = 0.1 * Direction.y
        scene.addEntity(projectile)
    }
      
}
export function FirebulbSkill(script: ScriptObject, scene:Scene) {

    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")
    let cost = 10
    if (!checkStamina(script,cost)) {
        return
    } 
    if (Position) { 
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let projectile = new Firebulb()
        projectile.components[3].set("Owner", Owner)
        projectile.components[1].pos.x  = Position.x + Direction.x * 32
        projectile.components[1].pos.y  = Position.y + Direction.y * 32
        projectile.components[1].pos.z  = Position.z
        projectile.components[1].vel.x  = 0.1 * Direction.x
        projectile.components[1].vel.y  = 0.1 * Direction.y
        scene.addEntity(projectile)
    }
      
}
export function SnowballSkill(script: ScriptObject, scene:Scene) {
    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")
    let cost = 10
    if (!checkStamina(script,cost)) {
        return
    } 
    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let projectile = new Snowball()
        projectile.components[3].set("Owner", Owner)
        projectile.components[1].pos.x  = Position.x + Direction.x * 32
        projectile.components[1].pos.y  = Position.y + Direction.y * 32
        projectile.components[1].pos.z  = Position.z
        projectile.components[1].vel.x  = 0.1 * Direction.x
        projectile.components[1].vel.y  = 0.1 * Direction.y
        scene.addEntity(projectile)
    }
      
}
export function SlowballSkill(script: ScriptObject, scene:Scene) {
    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")
    let cost = 10
    if (!checkStamina(script,cost)) {
        return
    } 
    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let projectile = new Slowball()
        projectile.components[3].set("Owner", Owner)
        projectile.components[1].pos.x  = Position.x + Direction.x * 32
        projectile.components[1].pos.y  = Position.y + Direction.y * 32
        projectile.components[1].pos.z  = Position.z
        projectile.components[1].vel.x  = 0.1 * Direction.x
        projectile.components[1].vel.y  = 0.1 * Direction.y
        scene.addEntity(projectile)
    }
      
}
export function RockThrowSkill(script: ScriptObject, scene:Scene) {

    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")
    let cost = 15
    if (!checkStamina(script,cost)) {
        return
    } 
    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let projectile = new Stone(Owner, item)
        projectile.components[3].set("Owner", Owner)
        projectile.components[1].pos.x  = Position.x + Direction.x * 32
        projectile.components[1].pos.y  = Position.y + Direction.x * 32
        projectile.components[1].pos.z  = Position.z
        projectile.components[1].vel.x  = 0.1 * Direction.x
        projectile.components[1].vel.y  = 0.1 * Direction.y
        scene.addEntity(projectile)
    }
      
}




export function LightningSkill(script: ScriptObject, scene:Scene) {

    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")
    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let projectile = new Lightning()
        projectile.components[3].set("Direction", {x:Direction.x, y:Direction.y, z: 0})
        projectile.components[3].set("Owner", Owner)
        projectile.components[1].pos.x  = Position.x + Direction.x * 32
        projectile.components[1].pos.y  = Position.y + Direction.x * 32
        projectile.components[1].pos.z  = Position.z
        scene.addEntity(projectile)
    }
      
}
export function LavaPoolSkill(script: ScriptObject, scene:Scene) {

    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")
    const cost  = 25
    if (!checkStamina(script,cost)) {
        return
    } 
    if (Position) {

        let projectile = new LavaPool()
        projectile.components[3].set("Owner", Owner)
        projectile.components[1].pos.x  = Position.x + Direction.x * 32
        projectile.components[1].pos.y  = Position.y + Direction.x * 32
        projectile.components[1].pos.z  = Position.z
        scene.addEntity(projectile)
    }
      
}
export function KnifeStabSkill(script: ScriptObject, scene:Scene) {

    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")
    let cost = 30
    if (!checkStamina(script,cost)) {
        return
    } 
    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let projectile = new Knife()
        projectile.components[3].set("Owner", Owner)

        projectile.components[3].set("Duration", 200)
        projectile.components[1].pos.x  = Position.x + Direction.x 
        projectile.components[1].pos.y  = Position.y + Direction.y 
        projectile.components[1].pos.z  = Position.z
        projectile.components[1].vel.x  = 0.3 * Direction.x
        projectile.components[1].vel.y  = 0.3 * Direction.y
        scene.addEntity(projectile)
    }
      
}


export function AxeTornado(script:ScriptObject,scene: Scene) {
    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")

    let cost = 25
    if (!checkStamina(script,cost)) {
        return
    } 
    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let fireball = new GreatAxe(Owner, item)
        fireball.components[3].set("Duration", 1000)
        if (Direction.x <= 0) {
            fireball.components[3].set("Direction", -1)
        } else {
            fireball.components[3].set("Direction", 1)
        }
        scene.addEntity(fireball)
    }
}


export function AxeSwingSkill(script: ScriptObject, scene:Scene) {

    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")

    let cost = 25
    if (!checkStamina(script,cost)) {
        return
    } 
    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let fireball = new GreatAxe(Owner, item)
        if (Direction.x <= 0) {
            fireball.components[3].set("Direction", -1)
        } else {
            fireball.components[3].set("Direction", 1)
        }
        scene.addEntity(fireball)
    }
      
}
   

export function FireballCircleSkill(script: ScriptObject, scene:Scene) {

    let Position = script.get("Position")
    let Owner =script.entity
    let Direction = script.get("Direction")
    if (Position) {
        let item = {
            x: Position.x,
            y: Position.y,
            z: Position.z

        }
        let projectile = new Fireball()
        projectile.components[3].set("Owner", Owner)
        projectile.components[3].set("Axis", Position)
        projectile.components[1].pos.x  = Position.x
        projectile.components[1].pos.y  = Position.y
        projectile.components[1].pos.z  = Position.z
        projectile.components[1].vel.x  = 0
        projectile.components[1].vel.y  = 0
        projectile.makeSpinning()
        scene.addEntity(projectile)
    }
      
}