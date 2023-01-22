import { Collideable } from "../types/components.js";
import { System } from "../types/system.js";

export class CollisionSystem implements System<Collideable> {
    tag: string = "COLLISION";
    components: Collideable[];
    constructor() {
        this.components = []
    }
    update(dt: number): void {
        console.log("Collision System Running")
        for (var col1 of this.components) {
            for (var col2 of this.components) {
                if (col1.checkCollision(col2) && col1 != col2 ) {
                    col1.collides(col2)
                }
            }
        }
    }

}