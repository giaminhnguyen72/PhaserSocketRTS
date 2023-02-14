import { ContextInfo } from "../../core/context.js";
import { Component, Renderable } from "../../types/components.js";
import { Position } from "../../types/components/physics/transformType.js";
import { Entity } from "../../types/Entity.js";
import { System } from "../../types/system.js";
import { Transform } from "../Physics/transform.js";

export class Camera implements Renderable {
    context!: ContextInfo;
    
    system!: System<Renderable>;
    entity?: Entity | undefined;
    visible: boolean = true;
    alive: boolean = true;
    engineTag: string = "GRAPHICS";
    componentId?: number | undefined;
    transform: Transform
    scale: {x: number, y
        : number}
    pos: Position
    height: number
    width:number
    constructor(entity: Entity, width: number=-1, height: number = -1, curr: Position={x:0,y:0,z:0} , scale: {x: number, y: number} = {x: 1, y: 1}) {
        this.height = height
        this.width = width
        this.pos= curr
        this.transform = new Transform(entity,{x: 0, y: 0,z: 0})
        this.entity = entity
        this.scale = scale
    }
    initialize(): void {

    }
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        let context = this.context.ctx
        if (this.height < 0) {
            this.height = this.height * -1 * this.context.canvas.height
        }
        if (this.width < 0) {
            this.width = this.width * -1 * this.context.canvas.width
        }
        this.pos.x += this.transform.pos.x
        this.pos.y += this.transform.pos.y
        
        
        this.context.ctx.translate(this.transform.pos.x, this.transform.pos.y)
        context.clearRect(-1 * this.pos.x,-1 * this.pos.y,this.width, this.height)

        let items = this.system.components
        for (let i of items) {
            i[1].render(this.context.ctx)
        }
        
        this.transform.pos.x = 0
        this.transform.pos.y = 0
        this.context.ctx.save()
    }
    render(ctx: CanvasRenderingContext2D): void {
        
    }
    
    
}