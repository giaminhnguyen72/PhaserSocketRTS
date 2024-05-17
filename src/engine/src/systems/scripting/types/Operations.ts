import { ScriptingEngine } from '../ScriptingEngine.js'
import {Containable, Container, VectorContainer} from './Containers.js'
import { ContainerMap, TypeMap } from './HelperTypes.js'
class DataManager {
    containerMap: Map<string, Containable> = new Map()
    query<T>(type: new () => T) {
        let typeID = type.name
        let container = this.containerMap.get(typeID)
        if (container) {
            return container as ( Container<T>)
        } else {
            return undefined
        }
    }
    addContainer<Data, T extends Container<Data>>(dataType : new () => Data, containerType: (new (item: new ()=>Data) => T)) {
        let typeId = dataType.name
        let container = new containerType(dataType)
        this.containerMap.set(typeId, container)
        return container
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
    dataManager!: DataManager
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
    //dataManager!: DataManager
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
}