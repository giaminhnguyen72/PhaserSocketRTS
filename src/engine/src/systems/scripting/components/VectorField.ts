
import { Vector3 } from "../../../../../engine/src/types/components/physics/transformType.js";
import { EngineType } from "../../../../../engine/src/constants/engineType.js";
import { Component } from "../../../../../engine/src/types/components.js";
import { System } from "../../../../../engine/src/types/system.js";
import { ScriptingEngine } from "../ScriptingEngine.js";
import { ScriptObject } from "./Script.js";

class VectorField implements ScriptObject {
    entity!: number ;
    visible: boolean = true;
    alive: boolean = true;
    componentId?: number | undefined;
    system!: ScriptingEngine;
    copy(component: Component): void {
        throw new Error("Method not implemented.");
    }
    engineTag: string = "SCRIPTING";
    engineType: EngineType  
    className: string = "VECTORFIELD";
    properties: any;
    cellCountX: number = 16
    cellCountY: number = 16
    grid: Vector3[][] = []
    classString: string[] = []
    constructor(engineType: EngineType, ...classString: string[]) {
        this.engineType = engineType
        for (let i of classString) {
            this.classString.push(i)
        }
        
    }
    get(s:string) {

    }
    set(s: string, a: any): void {
        this.properties.set(s,a)
    }
    destructor(): void {
        throw new Error("Method not implemented.");
    }
    initialize(system: ScriptingEngine): void {
        let scene = system.sceneManager.getCurrentScene()
        this.system = system
        let width = scene.worldBounds.xMax - scene.worldBounds.xMin
        let height = scene.worldBounds.yMax - scene.worldBounds.yMin
        let grid: Vector3[][] = []
        for (let j = 0; j < this.cellCountY; j++) {
            let vectorArr = []
            for (let i = 0; i < this.cellCountX; i++) {
                let vec: Vector3 = {x:0, y:0, z:0}
                vectorArr.push(vec)
            }
            grid.push(vectorArr)
        }
        this.grid = grid
        



    }
    update(dt: number): void {
        for (let i of this.classString) {
            let components = this.system.queryClass(i)
            if (components) {
                for (let i of components) {
                    let pos = i.properties.get("Position")
                    if (pos) {
                        let scene = this.system.sceneManager.getCurrentScene()
                        let bounds = scene.worldBounds
                        let width = bounds.xMax - bounds.xMin
                        let height = bounds.yMax - bounds.yMin

                        let cellXSize = Math.floor(width / this.cellCountX)
                        let cellYSize = Math.floor(height / this.cellCountY)

                        let xIdx = Math.floor(pos.x / cellXSize)
                        let yIdx = Math.floor(pos.y / cellYSize)
                        this.bfs(xIdx, yIdx)

                    }
                }
            }
        }
    }
    bfs(xIdx: number, yIdx: number) {
        
    }
    
}
function bfs(xIdx: number, yIdx: number) {
    
}