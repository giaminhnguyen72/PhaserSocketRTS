import { Vector3 } from "../types/components/physics/transformType"

export function lerp(init: number, future: number, dt : number) {
    let returned = (1- dt) * init + dt * future

    return returned
}
export function  moveTowards(initPos: Vector3, targetPosition: Vector3, dt: number, speed: number, radius: number = 0) {
        
    let velNorm = {
        x: targetPosition.x - initPos.x,
        y: targetPosition.y - initPos.y,
        z: 0
    }
    // Distance
    let normalPos = Math.sqrt(velNorm.x* velNorm.x +velNorm.y*velNorm.y)
    if (normalPos >= radius ) {
        if (normalPos > 0) {
            velNorm.x /= normalPos
            velNorm.y /= normalPos
        } else {
            velNorm.x = 0
            velNorm.y = 0
        }
        

        velNorm.x *= speed
        velNorm.y *= speed

        initPos.x += velNorm.x *dt
        initPos.y += velNorm.y *dt
        return velNorm
    } else {
        return velNorm
    }

}
export function getDirection(init: Vector3, target:Vector3): Vector3 {

    let xDiff = target.x - init.x
    let yDiff = target.y - init.y
    let mag = Math.sqrt(xDiff ** 2 + yDiff ** 2)
    if (mag == 0) {
        return {x: 0, y:0, z: init.z}
    }
    return {x: xDiff / mag, y : yDiff/mag, z: init.z}
}
export function getDistance(init: Vector3, target:Vector3): number {

    let xDiff = target.x - init.x
    let yDiff = target.y - init.y
    let mag = Math.sqrt(xDiff ** 2 + yDiff ** 2)
    return mag
}