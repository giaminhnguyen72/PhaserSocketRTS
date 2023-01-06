
import { GraphicsEngine } from "../graphics/GraphicEngine.js";
import { PhysicsEngine } from "../physics/PhysicsEngine.js";
import { EngineConfig } from "../types/config.js";
import { System } from "../types/system.js";
import { SceneManager } from "./managers/SceneManager.js";

export class Engine {
    engineConfig: EngineConfig;
    canvasID: string = "engineCanvas"
    
    running:boolean
    sceneManager: SceneManager
    systems: System[] = []
    time: number = 0
    graphics?: GraphicsEngine
    constructor(gameConfig: EngineConfig = new EngineConfig(), systems?: System[]) {
        this.engineConfig = gameConfig
        
        if (this.engineConfig.physicsConfig) {
            this.systems.push(new PhysicsEngine())
        }
        
        if (systems) {
            for (var sys of systems) {
                this.systems.push(sys)
            }
        }
        if (this.engineConfig.graphicsConfig) {
            this.graphics = new GraphicsEngine(this.engineConfig.graphicsConfig)
            this.systems.push(this.graphics)
        }
        this.sceneManager = new SceneManager(this.engineConfig.sceneConfig, this.systems)
        this.running = true
        for (var sys of this.systems) {
            var comp = this.sceneManager.getCurrentScene().engineComponents.get(sys.tag)
            if (comp) {
                sys.components = comp
                console.log(sys.components)
            } else {
                throw Error("error in start method")
            }
            
        }

        this.running = false
        /**
         * 
         
        document.documentElement.style.height = '100%'
        document.documentElement.style.width = '100%'
        document.body.style.height = "100%"
        document.body.style.width = "100%"
        document.body.style.margin = "0"
        this.setup()
        this.div = this.generateDiv(this.engineConfig.parent) ;
        this.running = false
        */
        
    }
    /**
    parseStyle(styleObject: Object):  string {
        var cssArray: string[] = Object.entries(styleObject).map(([k,v]) => k + ":" + v + ";")
        console.log(this.engineConfig.parent)
        return cssArray.join(" ")
    }
    */
    /**
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
        canvas.id = this.canvasID
        console.log(this.parseStyle(this.engineConfig.style))
        console.log("Before")
        canvas.setAttribute('style', this.parseStyle(this.engineConfig.style))
        return canvas
    }
    getCtx() {
        var canvas = this.getCanvas()
        return canvas.getContext("2d")
    }
    getCanvas(): HTMLCanvasElement {
        var canvas = document.getElementById(this.canvasID)
        if (canvas instanceof HTMLCanvasElement) {
            return canvas
        } else {
            throw Error("engineCanvas should be a reserved id for DOM Components")
        }
        
    }
    
     * 
     
    setup() {
        var config = this.engineConfig
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
    */
   
    start(dt: number): void {
        this.running = true
        
        if (this.graphics) {
            this.update(dt)


            window.requestAnimationFrame(() => this.start(dt))
        } else {
            while(this.running) {
                this.update(dt)


            }
        }
        
    }
    update(dt: number) {

            for (var sys of this.systems) {
                sys.update(dt)
            }
                
            this.time += dt
            console.log(this.time)
            
    }



}