import { MouseType } from "../../constants/listener.js";
import { Component, Collideable, Listenable } from "../../types/components.js";
import { EventConfig } from "../../core/config.js";
import { System } from "../../types/system.js";
import { SceneManager } from "../../core/managers/SceneManager.js";

export class SocketEngine implements System<Listenable> {
    tag: string = "EVENTHANDLER";
    components: Map<number, Listenable>;
    eventConfig: EventConfig
    events: string[]
    deleted: Component[] = []
    constructor(eventConfig: EventConfig ={
        keyboard: false,
        mouse: false
    }) {
        this.components = new Map<number, Listenable>()
        this.events = []
        this.eventConfig = eventConfig
        window.addEventListener("click", (event) => {
            this.events.push("click")
            
        })
        window.addEventListener("keydown", (event) => {
            this.events.push(event.key)

        })


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
        console.log("Event Handler")
        var len = this.components.size
        console.log("Event Handler Components:"+this.components.size)
        console.log("Event Handler Components:"+this.components.size)
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
