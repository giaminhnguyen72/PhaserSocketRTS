import { Vector3 } from "../../../../engine/src/types/components/physics/transformType.js";
import { Bear } from "../../entities/Mobs/Bear.js";
import { Scene } from "./../../../../engine/src/core/scene.js";



function SpawnBear(scene: Scene, pos: Vector3) {
    let monster = new Bear()
    let position = monster.components[2].properties.get("Position")
    if (position) {
        position.x = pos.x
        position.y= pos.y
    }
    scene.addEntity(monster)
}
function SpawnCandowisp(scene: Scene, pos: Vector3) {
    let monster = new Bear()
    let position = monster.components[2].properties.get("Position")
    if (position) {
        position.x = pos.x
        position.y= pos.y
    }
    scene.addEntity(monster)
}
function SpawnDarkMage(scene: Scene, pos: Vector3) {
    let monster = new Bear()
    let position = monster.components[2].properties.get("Position")
    if (position) {
        position.x = pos.x
        position.y= pos.y
    }
    scene.addEntity(monster)
}
function SpawnEarthEater(scene: Scene, pos: Vector3) {
    let monster = new Bear()
    let position = monster.components[2].properties.get("Position")
    if (position) {
        position.x = pos.x
        position.y= pos.y
    }
    scene.addEntity(monster)
}
function S(scene: Scene, pos: Vector3) {
    let monster = new Bear()
    let position = monster.components[2].properties.get("Position")
    if (position) {
        position.x = pos.x
        position.y= pos.y
    }
    scene.addEntity(monster)
}
