
import { Entity} from "./Entity.js"

export interface Component {
    entity: Entity
    
    engineTag: string
    componentId?: number
    update(dt: number, ctx?: CanvasRenderingContext2D): void

}

/**
 * Entity 
 *      Component[] -> updated by system
 *      Renderable[] -> updated by graphics - has render method
 * 
 */
