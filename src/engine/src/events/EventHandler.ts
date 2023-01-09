import { MouseType } from "../constants/listener.js";
import { Component, Collideable, Listenable } from "../types/components.js";
import { EventConfig } from "../types/config.js";
import { System } from "../types/system.js";

export class EventHandler implements System{
    tag: string = "EVENTHANDLER";
    components: Component[];
    eventConfig: EventConfig
    events: string[]
    constructor(eventConfig: EventConfig ={
        keyboard: false,
        mouse: false
    }) {
        this.components = []
        this.events = []
        this.eventConfig = eventConfig
        window.addEventListener("click", (event) => {
            this.events.push("click")
            
        })
        window.addEventListener("keydown", (event) => {
            console.log(event.key)
            console.log(event.key)
            console.log(event.key)
            console.log(event.key)
            console.log(event.key)

            console.log(event.key)
            console.log(event.key)
            console.log(event.key)
            console.log(event.key)

        })
        

    }
    stuff<T extends Listenable>(obj: T) {
        
    }
    update(dt: number): void {
        console.log("Event Handler")

        for (var comp of this.components) {
            console.log("Has Component")
            var listenable: Listenable = comp as Listenable
            var eventMap = listenable.eventMap
            for (var e of this.events) {
                if (eventMap) {
                    var func = eventMap.get(e)
                    if (func) {
                        func()
                        console.log("Has Ran")
                    }
                }

            }
            
            comp.update(dt)
        }
        this.events = []
    }

}
