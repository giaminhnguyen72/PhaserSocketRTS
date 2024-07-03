import { ScriptingEngine } from '../ScriptingEngine.js'
import {Containable, Container, VectorContainer} from './Containers.js'
import { ContainerMap, TypeMap } from './HelperTypes.js'
export class ScriptEntity {
    dataManager: DataManager
    entityID:number
    containers: Containable[] = []
    componentID: number
    constructor(data: DataManager, entityID: number, componentID: number) {
        this.dataManager = data
        this.entityID = entityID
        this.componentID = componentID
    }
    addComponent<Data>(dataType : new () => Data, data: Data ) {
        let container = this.dataManager.getContainer<Data>(dataType)
        if (container) {
            let c = container as Container<Data>
            this.containers.push(c)
            c.add(this.entityID, data)
            return true
        }
        return false
    }
}

class DataManager {
    //THere is a way to generate IDS at runtime by giving each Component an id generically
    //However this can only be done in C++
    containerMap: Map<string, Containable> = new Map()
    // Entities can be used through a Sparse set probably
    //However we would need to se up a tombstone mechanism when entities get destroyed
    entities: Map<number, ScriptEntity> = new Map()
    entityID: number = 0
    added: ScriptEntity[] = []
    removed: ScriptEntity[] = []
    query<T>(type: new () => T) {
        let typeID = type.name
        let container = this.containerMap.get(typeID)
        if (container) {
            return container as ( Container<T>)
        } else {
            return undefined
        }
    }
    removeEntity(id: number) {
        let e = this.entities.get(id)
        if (e) {
            this.removed.push(e)
            // for (let i of e.containers) {

            //     //i.remove(id)
            // }
            return true
        } else {
            return false
        }

    }
    trueRemove() {
        this.added.length = 0
        for (let i of this.removed) {
            
            for (let c of i.containers) {
                c.remove(i.entityID)
            }
            
        }
    }
    addEntity(componenId: number) {
        this.entityID++
        let e = new ScriptEntity(this, this.entityID, componenId)
        this.added.push(e)
        
        //this.entities.set(e.entityID, e.containers)
        return e
    }
    trueAdd() {
        for (let i of this.added) {

            this.entities.set(i.entityID, i)
            
        }
        this.added.length = 0
    }
    addContainer<Data, T extends Container<Data>>(dataType : new () => Data, containerType: (new (item: new ()=>Data) => T)) {
        let typeId = dataType.name
        let container = new containerType(dataType)
        this.containerMap.set(typeId, container)
        return container
    }
    getContainer<Data>(dataType : new () => Data) {
        let container = this.containerMap.get(dataType.name)
        if (container) {
            return container
        }
    }

}
interface Operable {
    queryContainer(dt: number,containerType: new (dataType: any) => Container<any  >    ,  componentManager: DataManager): void
}



export abstract class Operation<T extends (unknown)[] > implements Operable {
    ClassNames:TypeMap<T>

    constructor(types: TypeMap<T> ) {
        this.ClassNames = types
    }

    queryContainer(dt: number,containerType: new (dataType: new ()=> T[number]) => Container<T[number]  >    ,  componentManager: DataManager) {
        type C =  ((() =>T[number]))         
        let containerArr = []

        for (let i of this.ClassNames) {
            
            let container = componentManager.query<T[number]>(i)
            
            if (container) {
                containerArr.push(container)
                
            } else {
                let container = componentManager.addContainer<T[number] , Container<T[number]>>(i , containerType)
                containerArr.push(container)
            }

            

        }
        this.update(dt, containerArr as ContainerMap<T>)


    }
    
    abstract update(dt: number, container:  ContainerMap<T>): void
}

class Query<T extends unknown[]> {
    data: T
    constructor(data: T) {
        this.data = data
    }

}


export class OperationManager {
    operations: Operable[] = []
    dataManager: DataManager = new DataManager()
    update(dt: number) {
        for (let i of this.operations) {
            i.queryContainer(dt, VectorContainer, this.dataManager,)
        }
    }
    addOperation<T extends TypeMap<Operable[]>>(...operable: T) {
        for (let i of operable) {
            this.operations.push(new i())
        }
        
    }
}

export interface ScriptOperable {
    
    update(dt: number, scriptingEngine: ScriptingEngine): void
}
export class ScriptOperationManager {
    operations: ScriptOperable[] = []
    dataManager: DataManager = new DataManager()
    engine: ScriptingEngine
    constructor(scriptingEngine: ScriptingEngine) {
        this.engine = scriptingEngine
    }
    update(dt: number) {
        for (let i of this.operations) {
            i.update(dt, this.engine)
        }
    }
    addOperation<T extends TypeMap<ScriptOperable[]>>(operable: T) {
        for (let i of operable) {
            this.operations.push(new i())
        }
        
        
    }
    addContainer<Data, T extends Container<Data>>(dataType : new () => Data, containerType: (new (item: new ()=>Data) => T)) {
        return this.dataManager.addContainer<Data,T>(dataType, containerType)
    }
    
    addEntity(componenId: number) {
        return this.dataManager.addEntity(componenId)
    }
    removeEntity(id: number) {
        return this.dataManager.removeEntity(id)
    }
}