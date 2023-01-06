

import { Engine } from "matter"
import { GRAPHICS_TAG } from "../constants/componentType.js"
import { Component } from "../types/components.js"
import { GraphicsConfig } from "../types/config.js"
import { Entity } from "../types/Entity.js"

import { System } from "../types/system.js"

export class GraphicsEngine implements System{
    tag: string = GRAPHICS_TAG
    components: Component[]
    entities: Entity[]
    graphicsConfig: GraphicsConfig
    div: HTMLDivElement
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    constructor(graphicsConfig: GraphicsConfig) {
        this.graphicsConfig = graphicsConfig
        this.components = []
        document.documentElement.style.height = '100%'
        document.documentElement.style.width = '100%'
        document.body.style.height = "100%"
        document.body.style.width = "100%"
        document.body.style.margin = "0"
        this.setup()
        this.canvas = this.generateCanvas() as HTMLCanvasElement
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D
        this.div = this.generateDiv(this.graphicsConfig.parent) ;
        this.entities = []
        
    }
    
    
    update(dt: number) {
        console.log("Graphics")
        this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height)
        for (var comp of this.components) {
            console.log(comp.componentId)
            comp.update(dt, this.ctx)
            console.log("Inside Graphics Component")
            console.log(comp.componentId)

        }
        
        
    }

    
    generateDiv(parent: string) {
        var div: HTMLDivElement = document.createElement('div')
        div.id = parent
        div.style.position = "absolute"
        div.style.height = "100%" 
        div.style.width = "100%"
        div.style.zIndex = "1"
        div.style.backgroundImage = "/images/test.jpg"
        
        div.appendChild(this.canvas)
        document.body.appendChild(div)

        console.log("test")
        return div
    }
    generateCanvas(): HTMLElement {
        var canvas = document.createElement("CANVAS")
        canvas.id = this.graphicsConfig.canvasID
        console.log(this.parseStyle(this.graphicsConfig.style))
        console.log("Before")
        canvas.setAttribute('style', this.parseStyle(this.graphicsConfig.style))
        return canvas
    }
    getCtx() {
        var canvas = this.getCanvas()
        return canvas.getContext("2d")
    }
    getCanvas(): HTMLCanvasElement {
        var canvas = document.getElementById(this.graphicsConfig.canvasID)
        if (canvas instanceof HTMLCanvasElement) {
            return canvas
        } else {
            throw Error("engineCanvas should be a reserved id for DOM Components")
        }
        
    }
    parseStyle(styleObject: Object):  string {
        var cssArray: string[] = Object.entries(styleObject).map(([k,v]) => k + ":" + v + ";")
        console.log(this.graphicsConfig.parent)
        return cssArray.join(" ")
    }
    setup() {

        if (true) {
            var image = new Image()
            image.src = "/images/test.jpg"
            image.style.position ="absolute"
            image.style.zIndex = "-1"
            image.style.width = "100%"
            image.style.height= "100%"

            document.body.appendChild(image)

        }
    }
}