
import { ContextInfo } from "../core/context.js"
import { CollisionSystem } from "../systems/Collision/CollisionSystem.js"
import { EventHandler } from "../systems/events/EventHandler.js"
import { GraphicsEngine } from "../systems/graphics/GraphicEngine.js"
import { PhysicsEngine } from "../systems/physics/PhysicsEngine.js"
import { Shape } from "./components/collision/shape.js"
import { Acceleration, Force, Position, Velocity } from "./components/physics/transformType.js"
import { Entity} from "./Entity.js"
import { System } from "./system.js"

export interface Component {
    system: System<Component>
    entity?: Entity
    visible: boolean
    alive: boolean
    engineTag: string
    componentId?: number
    update(dt: number, ctx?: CanvasRenderingContext2D): void
    
}
export interface Renderable extends Component {
    context: ContextInfo
    render(ctx: CanvasRenderingContext2D): void
    initialize(): void
}

/**
 * Entity 
 *      Component[] -> updated by system
 *      Renderable[] -> updated by graphics - has render method
 *      
 */


 export interface Collideable extends Component{
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
export interface Transformable extends Component {
    pos:Position
    vel:Velocity
    accel:Acceleration
}
export interface Forceable extends Transformable {
    mass: number
    force: Force
}