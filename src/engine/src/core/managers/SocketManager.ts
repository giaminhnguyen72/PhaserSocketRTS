import { io, Socket } from "socket.io-client";
import { EventHandler } from "../../systems/events/EventHandler.js";
import { Component, Listenable, Renderable } from "../../types/components.js";
import { System } from "../../types/system.js";
import { EventConfig, SocketClientConfig } from "../config.js";
import { SceneManager } from "./SceneManager.js";

export class SocketManager implements System<Listenable>{
    socket: Socket

    sceneManager: SceneManager
    tag: string = "EVENTHANDLER";
    components: Map<number, Listenable>;

    events: string[]
    deleted: Component[] = []
    constructor(sceneManager: SceneManager, config: SocketClientConfig) {
        this.components = new Map<number, Listenable>()
        this.events = []

        this.sceneManager = sceneManager
        
        this.socket = io()
        
        if (config.socketEventMap) {
            config.socketEventMap(this.socket)       
   
        }
        window.addEventListener("click", (event) => {
            this.events.push("click")
            
        })
        window.addEventListener("keydown", (event) => {
            this.events.push(event.key)
            console.log(event.key)
        })

    }
    register(comp: Listenable): void {
        if (comp.componentId == undefined || comp.componentId == null) {
            let id = SceneManager.getUniqueComponentId()
            comp.componentId = id
            comp.system = this
            this.components.set(id, comp)
        } else {
            comp.system = this
            this.components.set(comp.componentId, comp)
        }
        console.log("Socket Manager registered")
    }
    unregister(comp: number): void {
       let deleted = this.components.get(comp) 
       if (deleted) {
            deleted.alive = false

            this.deleted.push(deleted)
            
       }
    }
    

    update(dt: number): void {
        console.log("Client Socket Handler")
        console.log("Client Socket Handler Components:"+this.components.size)
        var len = this.components.size

        let keys = [...this.components.keys()]
        for (var comp of keys) {
            

            var listenable: Listenable = this.components.get(comp) as Listenable
            var eventMap = listenable.eventMap
            for (var e of this.events) {
                if (eventMap) {
                    var func = eventMap.get(e)
                    if (func) {
                        func()

                    }
                }

            }
            
            listenable.update(dt)
        }
        while (this.deleted.length > 0 ) {
            let comp = this.deleted.pop()
            this.components.delete(comp?.componentId as number)
            
        }
        this.events = []

    }
    
}