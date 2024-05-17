
import { Collideable } from "../../../../../engine/src/types/components.js";
import { Vector3 } from "../../../../../engine/src/types/components/physics/transformType.js";
import { Circle, Rectangle } from "../../../types/components/collision/shape.js"
import { BoxCollider, CircleCollider } from "../components/Collider.js";

export function RectangleRectangleCollisionHandler(boxCollider:BoxCollider, rectangle: Rectangle) {
    var ret: boolean = false
    var rect = boxCollider.shape
    if (rect.rot == 0 && rectangle.rot == 0) {
        if (
            rect.pos.x + rect.dim.length > rectangle.pos.x &&
            rect.pos.x <  rectangle.pos.x +rectangle.dim.length &&
            rect.pos.y + rect.dim.height > rectangle.pos.y &&
            rect.pos.y < rectangle.pos.y + rectangle.dim.height 

        ) {
            return true
        } else {
            return false
        }
    } else {

    }
    return ret
}
export function RectangleCircleCollisionHandler(boxColider: BoxCollider, circle: Circle) {
    
}
export function CircleRectangleCollisionHandler(boxColider:CircleCollider, rectangle: Rectangle) {
    
}
export function CircleCircleCollisionHandler(circleColider: CircleCollider, circle: Circle) {
    
}
export function SATCollision(collider1:Collideable, collider2: Collideable) {
    let normals = collider1.normals
    for (let normal of normals) {

        let mm1 = FindMaxMinProjection(collider1.getRectangle(), normal)
        let mm2 =  FindMaxMinProjection(collider2.getRectangle(), normal)
        if (mm1[1] < mm2[0] || mm2[1] < mm1[0]) {
            return false;
        } 
    }
    let normals2 = collider2.normals
    for (let normal of normals2) {

        let mm1 = FindMaxMinProjection(collider1.getRectangle(), normal)
        let mm2 =  FindMaxMinProjection(collider2.getRectangle(), normal)
        if (mm1[1]< mm2[0] || mm2[1] < mm1[0]) {
            return false;
        } 
    }
    return true
}
export function getRectangleNormals(rect: Rectangle) {
    let height = rect.dim.height
    let width = rect.dim.length
    let angleCos = Math.cos(rect.rot)
    let angleSin = Math.sin(rect.rot)


    let tlX =  (-0.5 * width * angleCos - 0.5 * height * angleSin)
    let tlY =  (-0.5 * width * angleSin + 0.5 * height * angleCos)


    let trX = 0.5 * width * angleCos - 0.5 * height * angleSin
    let trY = 0.5 * width * angleSin + 0.5 * height * angleCos




    let brX = 0.5 * width * angleCos + 0.5 * height * angleSin
    let brY = 0.5 * width * angleSin - 0.5 * height * angleCos


    let blX = (-0.5 * width * angleCos + 0.5 * height * angleSin)
    let blY =  (-0.5 * width * angleSin - 0.5 * height * angleCos)

    let n1 = [trY - tlY, -1 * (trX - tlX)]

    
    let n2 = [brY - trY, -1 * (brX - trX)]
    let n3 = [blY - brY, -1 * (blX - brX)]
    let n4 = [tlY - blY, -1 * (tlX - blX)]

    let normals = [n1, n2, n3, n4]
    let ans = []
    for (let norm of normals) {
      let det = norm[0] * norm[0] + norm[1] * norm[1]

      norm[0] /= det
      norm[1] /= det
      ans.push({
            x: norm[0],
            y: norm[1],
            z: 0
        })
    }

    return ans
} 
function FindMaxMinProjection(rect: Rectangle, axis: Vector3) {
    let height = rect.dim.height
    let width = rect.dim.length
    let angleCos = Math.cos(rect.rot)
    let angleSin = Math.sin(rect.rot)
    let tlX =  (-0.5 * width * angleCos - 0.5 * height * angleSin) + rect.pos.x
    let tlY =  (-0.5 * width * angleSin + 0.5 * height * angleCos) + rect.pos.y


    let trX = 0.5 * width * angleCos - 0.5 * height * angleSin + rect.pos.x
    let trY = 0.5 * width * angleSin + 0.5 * height * angleCos + rect.pos.y




    let brX = 0.5 * width * angleCos + 0.5 * height * angleSin + rect.pos.x
    let brY = 0.5 * width * angleSin - 0.5 * height * angleCos + rect.pos.y


    let blX = (-0.5 * width * angleCos + 0.5 * height * angleSin) + rect.pos.x
    let blY =  (-0.5 * width * angleSin - 0.5 * height * angleCos) + rect.pos.y

    let e1 = [(tlX), tlY]

    
    let e2 = [(trX),trY]
    let e3 = [ ( brX), brY]
    let e4 = [ ( blX),  blY]
    let vertices = [e1,e2,e3,e4]

    let first = e1[0] * axis.x + e1[1] * axis.y
    let min = first
    let max = first
    for (let i = 1; i < vertices.length; i++) {
        let data = vertices[i][0] * axis.x + vertices[i][1] * axis.y
        
        max = max > data ? max : data;
        min = min < data ? min : data;
        
    }
    return [min, max]

}