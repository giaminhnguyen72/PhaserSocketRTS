import { CollisionConfig } from "../../core/config.js";
import { SceneManager } from "../../core/managers/SceneManager.js";
import { Collideable } from "../../types/components.js";
import { System } from "../../types/system.js";

export class CollisionSystem implements System<Collideable> {
    tag: string = "COLLISION";
    components: Map<number, Collideable>;
    config: CollisionConfig
    deleted: Collideable[]
    constructor(config: CollisionConfig) {
        this.components = new Map<number, Collideable>()
        this.config = config
        this.deleted = []
    }
    register(comp: Collideable): void {
        if (comp.componentId == undefined || comp.componentId == null) {
            let id = SceneManager.getUniqueComponentId()
            comp.componentId = id
            comp.system = this
            this.components.set(id, comp)
        }
        
    }
    unregister(comp: number): void {
        let deleted = this.components.get(comp) 
       if (deleted) {
            deleted.alive = false

            this.deleted.push(deleted)
       }
    
    
    }
    
    update(dt: number): void {
        console.log("Collision System Running")

        for (var [key1, col1] of this.components) {
            if (col1.visible) {
                for (var [key2, col2] of this.components) {
                    if (col2.visible && col1.checkCollision(col2) && col1 != col2) {
                        col1.collides(col2)
                    } else if (!col2.alive) {
                        this.deleted.push(col2)
                    }
                }
            }

            
        }
        while (this.deleted.length > 0) {
            let popped = this.deleted.pop()
            if (popped) {
                this.deleteComponent(popped)

            }
            
        }

    }
    deleteComponent(col: Collideable) {
        if (col.componentId) {
            this.components.delete(col.componentId)
        }


    }

}