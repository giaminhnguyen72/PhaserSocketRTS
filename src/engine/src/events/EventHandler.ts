import { Component } from "../types/components";
import { System } from "../types/system";

class EventHandler implements System{
    tag: string = "EVENTHANDLER";
    components: Component[];
    constructor() {
        this.components = []
        

    }
    update(dt: number): void {
        throw new Error("Method not implemented.");
    }

}