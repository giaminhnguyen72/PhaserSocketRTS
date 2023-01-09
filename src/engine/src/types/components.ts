
import { Entity} from "./Entity.js"

export interface Component {
    
    entity?: Entity
   
    engineTag: string
    componentId?: number
    update(dt: number, ctx?: CanvasRenderingContext2D): void
    
}
export interface Renderable extends Component {
    render(ctx: CanvasRenderingContext2D): void
}

/**
 * Entity 
 *      Component[] -> updated by system
 *      Renderable[] -> updated by graphics - has render method
 *      
 */


 export interface Collideable extends Component {
    checkCollider(collider: Collideable): void
    collides(collider: Collideable): void
    
}
export interface Listenable extends Component {
    eventMap: Map<string, () => void>
}
