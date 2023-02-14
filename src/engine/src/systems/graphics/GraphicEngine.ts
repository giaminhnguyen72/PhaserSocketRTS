


import { GRAPHICS_TAG } from "../../constants/componentType.js"
import { Component, Listenable, Renderable } from "../../types/components.js"
import { GraphicsConfig } from "../../core/config.js"
import { ContextInfo } from "../../core/context.js"
import { Entity } from "../../types/Entity.js"

import { System } from "../../types/system.js"
import { Scene } from "../../core/scene.js"
import { SceneManager } from "../../core/managers/SceneManager.js"

export class GraphicsEngine implements System<Renderable>{
    tag: string = GRAPHICS_TAG
    components: Map<number, Renderable>

    graphicsConfig: GraphicsConfig
    contextInfo: ContextInfo
    deleted: Component[]
    constructor(graphicsConfig: GraphicsConfig, context: ContextInfo) {
        this.graphicsConfig = graphicsConfig
        this.components = new Map<number, Renderable>()
        this.deleted = []
        document.documentElement.style.height = '100%'
        document.documentElement.style.width = '100%'
        document.body.style.height = "100%"
        document.body.style.width = "100%"
        document.body.style.margin = "0"


        this.contextInfo = context
    }
    register(comp: Renderable): void {
        if (comp.componentId == undefined || comp.componentId == null) {
            let id = SceneManager.getUniqueComponentId()
            comp.componentId = id
            comp.system = this
            comp.context = this.contextInfo
            comp.initialize()
            this.components.set(id, comp)
        }
    }
    unregister(id: number): void {
        let deleted = this.components.get(id) 
       if (deleted) {
            deleted.alive = false
            
            this.deleted.push(deleted)

            console.log(deleted.entity?.id + " s Component with id " +  deleted.componentId + "is popped")
       }
    }
    
    
    
    update(dt: number) {
        var ctx = this.contextInfo.ctx

        console.log("Graphics engine running")
        
        for (var c of this.components) {
            let comp = c[1]

            
            comp.update(dt)


        }
        while (this.deleted.length > 0 ) {
            let comp = this.deleted.pop()
            this.components.delete(comp?.componentId as number)
        }


        
        
    }
    setScene(scene: Scene): void {
        var get = scene.engineComponents.get(this.tag)
        if(get) {

        }
    }

    

}