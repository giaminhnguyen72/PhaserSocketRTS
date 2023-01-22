
import { EventHandler } from "../events/EventHandler.js";
import { GraphicsEngine } from "../graphics/GraphicEngine.js";
import { PhysicsEngine } from "../physics/PhysicsEngine.js";
import { ScriptingEngine } from "../scripting/ScriptingEngine.js";
import { Component } from "../types/components.js";
import { EngineConfig } from "./config.js";
import { ContextInfo } from "./context.js";
import { System } from "../types/system.js";
import { SceneManager } from "./managers/SceneManager.js";
import { CollisionSystem } from "../Collision/CollisionSystem.js";

export class Engine {
    engineConfig: EngineConfig;
    canvasID: string = "engineCanvas"
    
    running:boolean
    sceneManager: SceneManager
    systems: System<Component>[] = []
    time: number = 0
    graphics?: GraphicsEngine
    contextInfo?: ContextInfo
    constructor(gameConfig: EngineConfig = {isServer: true}, systems?: System<Component>[]) {
        this.engineConfig = gameConfig
        if (gameConfig.graphicsConfig) {
            this.contextInfo = new ContextInfo(gameConfig.graphicsConfig)
        }
        if (this.engineConfig.eventConfig) {
            this.systems.push(new EventHandler(this.engineConfig.eventConfig))
        }
        
        if (this.engineConfig.physicsConfig) {
            this.systems.push(new PhysicsEngine())
        }
        if (this.engineConfig.scriptingConfig && this.contextInfo) {
            this.systems.push( new ScriptingEngine())
        }
        
        if (systems) {
            for (var sys of systems) {
                this.systems.push(sys)
            }
        }
        if (this.engineConfig.collisionConfig) {
            this.systems.push(new CollisionSystem())
        }
        
        if (this.engineConfig.graphicsConfig && this.contextInfo) {
            console.log("Console.context info")
            console.log(this.contextInfo)
            this.graphics = new GraphicsEngine(this.engineConfig.graphicsConfig, this.contextInfo)
            this.systems.push(this.graphics)
        }
        this.sceneManager = new SceneManager(this.engineConfig.sceneConfig, this.systems)
        this.running = true
        for (var sys of this.systems) {
            var comp = this.sceneManager.getCurrentScene().engineComponents.get(sys.tag)
            if (comp) {
                sys.components = comp

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
   
    start(time: number): void {
        this.running = true
        
        if (this.graphics) {



            window.requestAnimationFrame((timestamp) => {
                
                let dt = timestamp - this.time
                this.update(dt)
                this.time = timestamp
            })
        } else {
            while(this.running) {
                this.update(time)


            }
        }
        
    }
    update(dt: number) {
            console.log(this)
            for (var sys of this.systems) {
                sys.update(dt)
            }
            this.sceneManager.update(dt)    
            this.time += dt
            console.log(this.time)
            window.requestAnimationFrame((timestamp:number) => {
                let dt = timestamp - this.time
                this.update(dt)
                this.time = timestamp
            })
            
    }



}