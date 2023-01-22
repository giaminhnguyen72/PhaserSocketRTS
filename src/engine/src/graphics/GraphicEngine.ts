


import { GRAPHICS_TAG } from "../constants/componentType.js"
import { Component, Listenable, Renderable } from "../types/components.js"
import { GraphicsConfig } from "../core/config.js"
import { ContextInfo } from "../core/context.js"
import { Entity } from "../types/Entity.js"

import { System } from "../types/system.js"
import { Scene } from "../core/scene.js"

export class GraphicsEngine implements System<Renderable>{
    tag: string = GRAPHICS_TAG
    components: Renderable[]
    entities: Entity[]
    graphicsConfig: GraphicsConfig
    contextInfo: ContextInfo
    constructor(graphicsConfig: GraphicsConfig, context: ContextInfo) {
        this.graphicsConfig = graphicsConfig
        this.components = []
        document.documentElement.style.height = '100%'
        document.documentElement.style.width = '100%'
        document.body.style.height = "100%"
        document.body.style.width = "100%"
        document.body.style.margin = "0"


        this.entities = []
        this.contextInfo = context
    }
    
    
    update(dt: number) {
        var ctx = this.contextInfo.ctx
        console.log("Graphics")
        console.log(this.contextInfo.canvas.width)
        console.log(this.contextInfo.canvas.height)
        console.log("Graphics engine running")
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height)
        for (var comp of this.components) {
            console.log(comp.componentId)
            
            comp.update(dt, ctx)
            console.log("Inside Graphics Component")
            console.log(comp.componentId)

        }

        
        
    }
    setScene(scene: Scene): void {
        var get = scene.engineComponents.get(this.tag)
        if(get) {

        }
    }

    

}