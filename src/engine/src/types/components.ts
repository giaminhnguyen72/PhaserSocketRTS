
import { Shape } from "./components/collision/shape.js"
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
    collideType: string
    shape: Shape

    collides(collider: Collideable): void
    checkCollision(collider: Collideable):boolean
    
}
export interface Listenable extends Component {
    eventMap: Map<string, () => void>
}
export interface Listener<T> extends Listenable {

}
export interface EventSource extends Listenable {
    generateEvent(event: string): string
}
