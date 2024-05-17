import { Vector3 } from "../../../../engine/src/types/components/physics/transformType.js";
import { Bear } from "../../entities/Mobs/Bear.js";
import { CandoWisp } from "../../entities/Mobs/Candowisp.js";
import { DarkMage } from "../../entities/Mobs/DarkMage.js";
import { EarthEater } from "../../entities/Mobs/EarthEater.js";
import { EarthTortoise } from "../../entities/Mobs/EarthTortoise.js";
import { Gargoyle } from "../../entities/Mobs/Gargoyle.js";
import { GiantRat } from "../../entities/Mobs/GiantRat.js";
import { GiantSpider } from "../../entities/Mobs/GiantSpider.js";
import { MindFlayer } from "../../entities/Mobs/MindFlayer.js";
import { Skeleton } from "../../entities/Mobs/Skeleton.js";
import { Snake } from "../../entities/Mobs/Snake.js";
import { WilloWisp } from "../../entities/Mobs/WilloWisp.js";
import { Wolf } from "../../entities/Mobs/Wolf.js";
import { Scene } from "./../../../../engine/src/core/scene.js";

export function SpawnMonsters(scene: Scene, monsterID: number, pos: Vector3) {
    switch (monsterID) {
        case 1:
            let bear = new Bear()
            bear.spawn(scene, pos)
            break;
        case 2:
            let wisp = new CandoWisp()
            wisp.spawn(scene, pos)
            break
        case 3:
            let darkmage = new DarkMage()
            darkmage.spawn(scene, pos)
            break
        case 4:
            let earthEater = new EarthEater()
            earthEater.spawn(scene, pos)
            break
        case 5:
            let earthTortoise = new EarthTortoise()
            earthTortoise.spawn(scene, pos)
            break
        case 6:
            let gargoyle = new Gargoyle()
            gargoyle.spawn(scene, pos)
            break
        case 7:
            let giantRat = new GiantRat()
            giantRat.spawn(scene, pos)
            break
        case 8:
            let giantSpider = new GiantSpider()
            giantSpider.spawn(scene, pos)
            break
        case 9:
            let mindFlayer = new MindFlayer()
            mindFlayer.spawn(scene, pos)
            break
        case 10:
            let skeleton = new Skeleton()
            skeleton.spawn(scene,pos)
            break
        case 11:
            let snake = new Snake()
            snake.spawn(scene, pos)
            break
        case 12:
            let will = new WilloWisp()
            will.spawn(scene, pos)
            break
        default:
            let wolf= new Wolf()
            wolf.spawn(scene, pos)


    }
}