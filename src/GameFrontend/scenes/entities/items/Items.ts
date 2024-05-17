import { Vector3 } from "../../../../engine/src/types/components/physics/transformType.js";
import { Script } from "../../../../engine/src/systems/scripting/components/Script.js";
import { Fireball } from "../Attacks/Fireball.js";
import { FireWandItem } from "./FireWand.js";


export interface Item {
    itemID: number
    use(script: Script): void
}
export interface Action {
    use(script: Script): void 
}
export interface ProjectileComponent {
    vel: Vector3
    damage: number
    pos: Vector3
}