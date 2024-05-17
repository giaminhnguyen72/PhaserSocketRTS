
import { EventHandler } from "../systems/events/EventHandler.js";
import { GraphicsEngine } from "../systems/graphics/GraphicEngine.js";
import { PhysicsEngine } from "../systems/physics/PhysicsEngine.js";
import { ScriptingEngine } from "../systems/scripting/ScriptingEngine.js";
import { Component } from "../types/components.js";
import { EngineConfig } from "./config.js";
import { ContextInfo } from "./context.js";
import { System } from "../types/system.js";
import { SceneManager } from "./managers/SceneManager.js";
import { CollisionSystem } from "../systems/Collision/CollisionSystem.js";
import { EngineType } from "../constants/engineType.js";
import { Server } from "socket.io";
import { Stage } from "./scene.js";

export class Engine {
    static engineConfig: EngineConfig;
    canvasID: string = "engineCanvas"
    static updateTime = 0
    running:boolean
    sceneManager: SceneManager
    systems: System<Component>[] = []
    time: number = 0
    graphics?: GraphicsEngine
    serverTime = 0n;
    clientTime = 0

    newMap: Map<string, Component> = new Map()
    constructor(gameConfig: EngineConfig = {
        engineType: EngineType.CLIENTONLY,
        sceneConfig: []

    }, systems?: System<Component>[]) {
        Engine.engineConfig = gameConfig
        this.sceneManager = new SceneManager(this, Engine.engineConfig,this.systems)

        if (Engine.engineConfig.eventConfig) {
            this.systems.push(new EventHandler(this.sceneManager, Engine.engineConfig.eventConfig)) 
        }
        
        if (Engine.engineConfig.physicsConfig) {
            this.systems.push(new PhysicsEngine(this.sceneManager, Engine.engineConfig.physicsConfig))
        }


        if (Engine.engineConfig.collisionConfig) {
            this.systems.push(new CollisionSystem(this.sceneManager, Engine.engineConfig.collisionConfig))
        }
        if (Engine.engineConfig.scriptingConfig) {
            this.systems.push( new ScriptingEngine(this.sceneManager, {engineType: Engine.engineConfig.engineType}))
        }
        
        if (Engine.engineConfig.graphicsConfig) {

            this.graphics = new GraphicsEngine(this.sceneManager, Engine.engineConfig.graphicsConfig)
            this.systems.push(this.graphics)
        }
        if (Engine.engineConfig.system) {
            for (let i of Engine.engineConfig.system) {
                let newSystem = new i[0](this.sceneManager, i[1])
                this.systems.push(newSystem)
            }
        }
        if (systems) {
            for (let sys of systems) {
                this.systems.push(sys)
            }
        }
        this.sceneManager.initialize(this.systems)


        this.running = true
        

        this.running = false

        /**
         * 
         
        document.documentElement.style.height = '100%'
        document.documentElement.style.width = '100%'
        document.body.style.height = "100%"
        document.body.style.width = "100%"
        document.body.style.margin = "0"
        this.setup()
        this.div = this.generateDiv(Engine.engineConfig.parent) ;
        this.running = false
        */
        
    }
    /**
    parseStyle(styleObject: Object):  string {
        let cssArray: string[] = Object.entries(styleObject).map(([k,v]) => k + ":" + v + ";")
        console.log(Engine.engineConfig.parent)
        return cssArray.join(" ")
    }
    */
    /**
    generateDiv(parent: string) {
        let div: HTMLDivElement = document.createElement('div')
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
        let canvas = document.createElement("CANVAS")
        canvas.id = this.canvasID
        console.log(this.parseStyle(Engine.engineConfig.style))
        console.log("Before")
        canvas.setAttribute('style', this.parseStyle(Engine.engineConfig.style))
        return canvas
    }
    getCtx() {
        let canvas = this.getCanvas()
        return canvas.getContext("2d")
    }
    getCanvas(): HTMLCanvasElement {
        let canvas = document.getElementById(this.canvasID)
        if (canvas instanceof HTMLCanvasElement) {
            return canvas
        } else {
            throw Error("engineCanvas should be a reserved id for DOM Components")
        }
        
    }
    
     * 
     
    setup() {
        let config = Engine.engineConfig
        if (true) {
            let image = new Image()
            image.src = "/images/test.jpg"
            image.style.position ="absolute"
            image.style.zIndex = "-1"
            image.style.width = "100%"
            image.style.height= "100%"

            document.body.appendChild(image)

        }
    }
    */
    loadEngines():void {
        for (let sys of this.systems) {

            this.sceneManager.systems.set(sys.tag, sys)

            
        }
    }
    start(dt: number): void {
        this.running = true
        console.log("Startng Engin ")
        let curr = this.sceneManager.getCurrentScene()
        
        for (let sys of this.systems) {

            this.sceneManager.systems.set(sys.tag, sys)

            
        }
        let config = curr.getSceneConfig()
        let entities = config.entities.length   
        for (let i = 0; i < entities; i++) {
            curr.addEntity(config.entities[i])
        }

        if (Engine.engineConfig.engineType == EngineType.CLIENTONLY || Engine.engineConfig.engineType == EngineType.SOCKETCLIENT) {

            
            
            window.requestAnimationFrame((timestamp:number) => {
                
                
                let deltaTime = 0
                this.time += deltaTime 
                this.clientTime = timestamp
                this.update(deltaTime)
                
                
            })
        } else {
            
            if (this.running) {
                this.serverTime = process.hrtime.bigint()
                this.serverUpdate(0, dt)
                
            }
            

        }
        
    }
    update(dt: number) {
            if (dt > 0 ) {
                this.sceneManager.currScene.update(dt)
                for (let sys of this.systems) {
                    sys.update(dt)
                }
      
                
                //console.log(dt)

                window.requestAnimationFrame((timestamp:number) => {
                
                    let currTime = timestamp
                    let deltaTime = currTime - this.clientTime
                    this.update(deltaTime)
                    this.time += deltaTime 
                    this.clientTime = currTime
                    
                })
                
            } else {
                this.sceneManager.currScene.update(dt)
                for (let sys of this.systems) {
                    sys.update(dt)
                }
                window.requestAnimationFrame((timestamp:number) => {
                
                    let currTime = timestamp
                    let deltaTime = currTime - this.clientTime
                    this.update(deltaTime)
                    this.time += deltaTime 
                    this.clientTime = currTime
                    
                })
            }
            
            
    }
    serverUpdate(dt: number, timeout: number) {
        if (dt > 0) {
            //console.log("updating")
            
            this.sceneManager.currScene.update(dt)
            
            for (let sys of this.systems) {
                sys.update(dt)
            }
            
            
            
            setTimeout(() => {
                if (this.running) {
                    let currTime = process.hrtime.bigint()
                    let realDelta =  Number(currTime - this.serverTime) / 1000000
                    this.serverUpdate(Number(realDelta), timeout)

                    this.time += Number(realDelta)
                    this.serverTime = currTime
                    //console.log(Engine.time) 
                }

            }, timeout)
             
        } else {
            this.sceneManager.currScene.update(dt)
            
            for (let sys of this.systems) {
                sys.update(dt)
            }
            setTimeout(() => { 
                if (this.running) {
                    let currTime = process.hrtime.bigint()
                    let realDelta =  (currTime - this.serverTime) / 1000000n
                    this.serverUpdate(Number(realDelta), timeout)

                    this.time += Number(realDelta)
                    this.serverTime = currTime
                     
                }

            }, timeout)
        }
            
    }



}



export class VariadicEngine {
    static engineConfig: EngineConfig;
    canvasID: string = "engineCanvas"
    static updateTime = 0
    running:boolean
    sceneManager: SceneManager
    systems: System<Component>[] = []
    time: number = 0
    graphics?: GraphicsEngine
    serverTime = 0n;
    clientTime = 0

    newMap: Map<string, Component> = new Map()

    constructor(gameConfig: EngineConfig = {
        engineType: EngineType.CLIENTONLY,
        sceneConfig: [],

    }, systems?: ({new(...s:any[]): System<Component>}) []) {
        Engine.engineConfig = gameConfig

        this.sceneManager = new SceneManager(this, Engine.engineConfig,this.systems)
        // Added Types to systems array to generate in constructor
        //This would usually be done with a variadic class in a variadic constructor
        if (systems) {
            for (let sys of systems) {
                let s = new sys(["d"])
            
            }
        }
        this.sceneManager.initialize(this.systems)
        this.running = true
        

        this.running = false

        /**
         * 
         
        document.documentElement.style.height = '100%'
        document.documentElement.style.width = '100%'
        document.body.style.height = "100%"
        document.body.style.width = "100%"
        document.body.style.margin = "0"
        this.setup()
        this.div = this.generateDiv(Engine.engineConfig.parent) ;
        this.running = false
        */
        let a =  new VariadicEngine({engineType: EngineType.CLIENTONLY, sceneConfig:[]}, [GraphicsEngine, PhysicsEngine])
    }
    /**
    parseStyle(styleObject: Object):  string {
        let cssArray: string[] = Object.entries(styleObject).map(([k,v]) => k + ":" + v + ";")
        console.log(Engine.engineConfig.parent)
        return cssArray.join(" ")
    }
    */
    /**
    generateDiv(parent: string) {
        let div: HTMLDivElement = document.createElement('div')
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
        let canvas = document.createElement("CANVAS")
        canvas.id = this.canvasID
        console.log(this.parseStyle(Engine.engineConfig.style))
        console.log("Before")
        canvas.setAttribute('style', this.parseStyle(Engine.engineConfig.style))
        return canvas
    }
    getCtx() {
        let canvas = this.getCanvas()
        return canvas.getContext("2d")
    }
    getCanvas(): HTMLCanvasElement {
        let canvas = document.getElementById(this.canvasID)
        if (canvas instanceof HTMLCanvasElement) {
            return canvas
        } else {
            throw Error("engineCanvas should be a reserved id for DOM Components")
        }
        
    }
    
     * 
     
    setup() {
        let config = Engine.engineConfig
        if (true) {
            let image = new Image()
            image.src = "/images/test.jpg"
            image.style.position ="absolute"
            image.style.zIndex = "-1"
            image.style.width = "100%"
            image.style.height= "100%"

            document.body.appendChild(image)

        }
    }
    */
    loadEngines():void {
        for (let sys of this.systems) {

            this.sceneManager.systems.set(sys.tag, sys)

            
        }
    }
    start(dt: number): void {
        this.running = true
        console.log("Startng Engin ")
        let curr = this.sceneManager.getCurrentScene()
        
        for (let sys of this.systems) {

            this.sceneManager.systems.set(sys.tag, sys)

            
        }
        let config = curr.getSceneConfig()
        let entities = config.entities.length   
        for (let i = 0; i < entities; i++) {
            curr.addEntity(config.entities[i])
        }

        if (Engine.engineConfig.engineType == EngineType.CLIENTONLY || Engine.engineConfig.engineType == EngineType.SOCKETCLIENT) {

            
            
            window.requestAnimationFrame((timestamp:number) => {
                
                
                let deltaTime = 0
                this.time += deltaTime 
                this.clientTime = timestamp
                this.update(deltaTime)
                
                
            })
        } else {
            
            if (this.running) {
                this.serverTime = process.hrtime.bigint()
                this.serverUpdate(0, dt)
                
            }
            

        }
        
    }
    update(dt: number) {
            if (dt > 0 ) {
                this.sceneManager.currScene.update(dt)
                for (let sys of this.systems) {
                    sys.update(dt)
                }
      
                
                //console.log(dt)

                window.requestAnimationFrame((timestamp:number) => {
                
                    let currTime = timestamp
                    let deltaTime = currTime - this.clientTime
                    this.update(deltaTime)
                    this.time += deltaTime 
                    this.clientTime = currTime
                    
                })
                
            } else {
                this.sceneManager.currScene.update(dt)
                for (let sys of this.systems) {
                    sys.update(dt)
                }
                window.requestAnimationFrame((timestamp:number) => {
                
                    let currTime = timestamp
                    let deltaTime = currTime - this.clientTime
                    this.update(deltaTime)
                    this.time += deltaTime 
                    this.clientTime = currTime
                    
                })
            }
            
            
    }
    serverUpdate(dt: number, timeout: number) {
        if (dt > 0) {
            //console.log("updating")
            
            this.sceneManager.currScene.update(dt)
            
            for (let sys of this.systems) {
                sys.update(dt)
            }
            
            
            
            setTimeout(() => {
                if (this.running) {
                    let currTime = process.hrtime.bigint()
                    let realDelta =  Number(currTime - this.serverTime) / 1000000
                    this.serverUpdate(Number(realDelta), timeout)

                    this.time += Number(realDelta)
                    this.serverTime = currTime
                    //console.log(Engine.time) 
                }

            }, timeout)
             
        } else {
            this.sceneManager.currScene.update(dt)
            
            for (let sys of this.systems) {
                sys.update(dt)
            }
            setTimeout(() => { 
                if (this.running) {
                    let currTime = process.hrtime.bigint()
                    let realDelta =  (currTime - this.serverTime) / 1000000n
                    this.serverUpdate(Number(realDelta), timeout)

                    this.time += Number(realDelta)
                    this.serverTime = currTime
                     
                }

            }, timeout)
        }
            
    }



}