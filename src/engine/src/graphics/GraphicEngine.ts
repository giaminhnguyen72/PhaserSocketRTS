import { componentType } from "../constants/componentType.js"

import { Component } from "../types/components.js"
import { GraphicsConfig } from "../types/config.js"
import { Drawable } from "../types/Entity.js"
import { System } from "../types/system.js"

export class GraphicsEngine implements System{
    tag: string = "GRAPHICS"
    components: Component[]
    graphicsConfig: GraphicsConfig
    div: HTMLDivElement
    constructor(graphicsConfig: GraphicsConfig) {
        this.graphicsConfig = graphicsConfig
        this.components = []
        document.documentElement.style.height = '100%'
        document.documentElement.style.width = '100%'
        document.body.style.height = "100%"
        document.body.style.width = "100%"
        document.body.style.margin = "0"
        this.setup()
        this.div = this.generateDiv(this.graphicsConfig.parent) ;
    }
    
    
    update(dt: number) {
        for (var comp of this.components) {
            comp.update(dt)
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
        div.appendChild(this.generateCanvas())
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