
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events.js";
import { EventHandler } from "../../systems/events/EventHandler.js";
import { Component, Listenable } from "../../types/components.js";
import { System } from "../../types/system.js";
import { EventConfig } from "../config.js";
import { SceneManager } from "./SceneManager.js";

export class SocketServerManager implements System<Listenable>{
    socket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>

    sceneManager: SceneManager
    tag: string = "EVENTHANDLER";
    components: Map<number, Listenable>;

    events: string[]
    deleted: Component[] = []
    constructor(sceneManager: SceneManager) {
        this.components = new Map<number, Listenable>()
        this.events = []

        this.sceneManager = sceneManager
        if (this.sceneManager.engineConfig.server) {
            this.socket = this.sceneManager.engineConfig.server

        } else {
            this.socket = new Server()
        }
        
        
    }
    register(comp: Listenable): void {
        if (comp.componentId == undefined || comp.componentId == null) {
            let id = SceneManager.getUniqueComponentId()
            comp.componentId = id
            comp.system = this
            this.components.set(id, comp)
        }
    }
    unregister(comp: number): void {
       let deleted = this.components.get(comp) 
       if (deleted) {
            deleted.alive = false

            this.deleted.push(deleted)
            
       }
    }
    

    update(dt: number): void {

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
        console.log("Event Handler Components:"+this.components.size)
    }
    
}