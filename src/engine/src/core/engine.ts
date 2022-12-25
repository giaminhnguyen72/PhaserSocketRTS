import { EngineConfig } from "../types/config.js";

export class Engine {
    engineConfig: Object;
    constructor(gameConfig?: Object) {
        if (gameConfig == undefined || gameConfig == null) {
            this.engineConfig = {
                style: {}
            }
        } else {
            this.engineConfig = gameConfig as Object

        }
        
    }
    parseStyle():  string {
        var cssArray: string[] = Object.entries(this.engineConfig).map(([k,v]) => k + ":" + v + ";")
        
        return cssArray.join()
    }

}