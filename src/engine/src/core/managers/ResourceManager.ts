import { Resource } from "../Resource"

export interface Containable {

    // Usually in ecs this would be here but since typescript cants support real generics we get type id of Resource instead
    // getTypeID(): string 
    
}
export abstract class Container<Resource> implements Containable {
    abstract get(id: string): Resource | undefined
    abstract iterate(callback:(item: [ string, Resource]) => void): void;
    abstract remove(id: string): Resource | undefined;
    abstract add(id: string, item: Resource): void
    // Usually in ecs this would be here but since typescript cants support real generics we get type id of Resource instead
    // getTypeID(): string {
    //     return typeof this
    // }

    abstract getTypeID(): string
    
}
export class ResourceContainer<T> extends Container<T> {
    // Enitity ID to Component
    data: Map<string, T> = new Map()
    type: string
    constructor(type: new (path:string) => T) {
        super()
        this.type =  type.name
    }
    get(id: string) {
        return this.data.get(id)
    }
    add(id: string, item: T) {
        this.data.set(id, item)
    }
    iterate(callback:(item: [ string, T]) => void): void {
        for (let i of this.data) {
            callback(i)
        }
    }
    remove(id: string) {
        let item = this.data.get(id)
        this.data.delete(id)
        return item

    }

    getTypeID(): string {
        return this.type   
    }
}
export class ResourceManager {
    loadDataResource<T extends Resource>(type: new () => T, name: string) {
        let resourceMap = this.resources.get(type.name)
        if (resourceMap) {
            let r = resourceMap as ResourceContainer<T> 
            let resource = r.get(name)
            return resource
        } else {
            
            let item = this.addResource<T>(type, name)
            return item
        }
    }
    load<T extends Resource>(type: new () => T, name: string) {
        let resourceMap = this.resources.get(type.name)
        if (resourceMap) {
            let r = resourceMap as ResourceContainer<T> 
            let resource = r.get(name)
            return resource
        } else {
            
            
            return undefined
        }
    }
    addDataResource<T extends Resource>(type: new () => T, name: string) {
        let resourceMap = this.resources.get(type.name)
        if (resourceMap) {
            let r = resourceMap as ResourceContainer<T> 
            let resource = new type()
            r.add(name, resource)
            return resource
            
        } else {
            let newContainer = new ResourceContainer<T>(type)
            let resource = new type()
            newContainer.add(name, resource)
            this.resources.set(type.name, newContainer)

            return resource
        }
    }
    addCreatedResource<T extends Resource>(type: new (...param: any[]) => T, data: T,name: string) {
        let resourceMap = this.resources.get(type.name)
        if (resourceMap) {
            let r = resourceMap as ResourceContainer<T> 
            let resource = data
            r.add(name, resource)
            return resource
            
        } else {
            let newContainer = new ResourceContainer<T>(type)
            let resource = data
            newContainer.add(name, resource)
            this.resources.set(type.name, newContainer)

            return resource
        }
    }
    //Needs to dispose the resource
    removeDataResource<T extends Resource>(type: new () => T, name: string) {
        let resourceMap = this.resources.get(type.name)
        if (resourceMap) {
            let r = resourceMap as ResourceContainer<T> 
            let item = r.remove(name)
            if (item) {
                return item
            } else {
                return undefined
            }
        } else {
            return undefined



        }
    }
    resources: Map<string, Containable> = new Map()
    loadResource<T extends Resource>(type: new (n: string) => T, name: string) {
        let resourceMap = this.resources.get(type.name)
        if (resourceMap) {
            let r = resourceMap as ResourceContainer<T> 
            let resource = r.get(name)
            return resource
        } else {
            
            let item = this.addResource<T>(type, name)
            return item
        }
    }
    addResource<T extends Resource>(type: new (n: string) => T, name: string) {
        let resourceMap = this.resources.get(type.name)
        if (resourceMap) {
            let r = resourceMap as ResourceContainer<T> 
            let resource = new type(name)
            r.add(name, resource)
            return resource
            
        } else {
            let newContainer = new ResourceContainer<T>(type)
            let resource = new type(name)
            newContainer.add(name, resource)
            this.resources.set(type.name, newContainer)

            return resource
        }
    }
    //Needs to dispose the resource
    removeResource<T extends Resource>(type: new (n: string) => T, name: string) {
        let resourceMap = this.resources.get(type.name)
        if (resourceMap) {
            let r = resourceMap as ResourceContainer<T> 
            let item = r.remove(name)
            if (item) {
                return true
            } else {
                return false
            }
        } else {
            return false



        }
    }
    
}