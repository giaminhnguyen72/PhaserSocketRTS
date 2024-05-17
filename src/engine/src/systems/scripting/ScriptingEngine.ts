import { Script, ScriptObject } from "./components/Script.js";
import { EngineType } from "../../constants/engineType.js";
import { SceneManager } from "../../core/managers/SceneManager.js";
import { System } from "../../types/system.js";
import { ScriptingConfig } from "../../core/config.js";
import { ScriptOperable, ScriptOperationManager } from "./types/Operations.js";
import { TypeMap } from "./types/HelperTypes.js";
export class ScriptingEngine implements System<ScriptObject> {
    tag: string ="SCRIPTING"  ;
    components: Map<number, ScriptObject>;
    deleted: ScriptObject[] = []
    engineType: EngineType
    sceneManager!: SceneManager
    objectDB: Map<string, Set<Script>> = new Map()
    updateSystems:Map<number, Script> = new Map()
    operations: ScriptOperationManager = new ScriptOperationManager(this)
    constructor(sceneManager: SceneManager, engineType: ScriptingConfig) {
        this.components = new Map<number, ScriptObject>()
        this.engineType = engineType.engineType
        this.sceneManager = sceneManager
    }
    addOperation<T extends TypeMap<ScriptOperable[]>>(sys: T) {
        this.operations.addOperation(sys)
    }
    addSuperClass(script:Script, superclass:string) {
        let objectSet = this.objectDB.get(superclass)
        if (objectSet) {
            objectSet.add(script)
        } else {
            let set:Set<Script> = new Set()
            set.add(script)
            this.objectDB.set(superclass,set)
        }
    }
    addSuperClasses(script:Script, ...superclasses: string[]) {
        for (let superclass of superclasses) {
            this.addSuperClass(script, superclass)
        }
        script.destroy = () => {
            for (let i of superclasses) {
                this.removeSuperClass(script, i)
            }
        }
    }
    removeSuperClass(script:Script, superclass:string) {
        let objectSet = this.objectDB.get(superclass)
        if (objectSet) {
            objectSet.delete(script)
        } else {

        }
    }
    queryClass(className :string) {
        let item = this.objectDB.get(className);
        if (item) {
            
            return item
        } else {
            return undefined
        }

    }


    

    register(comp: ScriptObject, id: number): void {
        if (comp.componentId == undefined || comp.componentId == null) {
            
            comp.componentId = id
            comp.system = this
            this.components.set(id, comp)
            
        }  else {

            comp.system = this
            this.components.set(comp.componentId, comp)
        }

        this.initialize(comp)

        
    }
    
    unregister(comp: number): void {
        let deleted = this.components.get(comp) 
       if (deleted) {
            deleted.alive = false

            this.deleted.push(deleted)
            deleted.destructor()


       }
    
    }
    initialize(comp: ScriptObject) {
        comp.initialize(this)

    }
    update(dt: number): void {
        //console.log("Scripting engine running")
        //console.log("Scripting Components: " + this.components.size)
        for (let comp of this.updateSystems) {
            if (comp[1].engineType == this.engineType) {
                comp[1].update(dt)
            } else if (comp[1].engineType = EngineType.BOTH) {
                comp[1].update(dt)
            }
            
        }
        this.operations.update(dt)
        while (this.deleted.length > 0 ) {

            let comp = this.deleted.pop()
            this.components.delete(comp?.componentId as number)

        }

    }

}