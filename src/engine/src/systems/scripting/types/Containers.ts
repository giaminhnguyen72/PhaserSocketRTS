export interface Containable {

    // Usually in ecs this would be here but since typescript cants support real generics we get type id of T instead
    // getTypeID(): string 
    remove(id:number): void
}

export abstract class Container<T> implements Containable {
    abstract get(id: number): T | undefined
    abstract iterate(callback:(item: [ number, T]) => void): void;
    abstract remove(id: number): T | undefined;
    abstract add(id: number, item: T): void
    // Usually in ecs this would be here but since typescript cants support real generics we get type id of T instead
    // getTypeID(): string {
    //     return typeof this
    // }

    abstract getTypeID(): string
    
}
// Entities are a number with an array of referrences to containers
//So entities act like indices for a database
export class VectorContainer<T> extends Container<T> {
    // Enitity ID to Component
    data: [number,T][] = []
    type: string
    constructor(type: new () => T) {
        super()
        this.type =  type.name
    }
    get(id: number) {
        for (let [id, d] of this.data) {
            if (id == id) {
                return d
            }
        }
    }
    add(id: number, item: T) {
        this.data.push([id, item])
    }
    iterate(callback:(item: [ number, T]) => void): void {
        for (let i of this.data) {
            callback(i)
        }
    }
    remove(id: number) {

        for (let i =0; i < this.data.length; i++) {
            let item =  this.data[i]
            let found = false
            if (item[0] == id) {
                if (this.data.length > 1) {
                    let last = this.data[this.data.length - 1]
                    this.data[i] = last
                    this.data.pop()
                } else if (this.data.length == 1) {
                    this.data.pop()
                }
                
                return undefined
                

            }
        }

    
        
        return undefined
    }

    getTypeID(): string {
        return this.type   
    }
}
export class MappedContainer<T> extends Container<T> {
    // Enitity ID to Component
    data: Map<number, T> = new Map()
    type: string
    constructor(type: new () => T) {
        super()
        this.type =  type.name
    }
    get(id: number) {
        return this.data.get(id)
    }
    add(id: number, item: T) {
        this.data.set(id, item)
    }
    iterate(callback:(item: [ number, T]) => void): void {
        for (let i of this.data) {
            callback(i)
        }
    }
    remove(id: number) {
        let item = this.data.get(id)
        this.data.delete(id)
        return item

    }

    getTypeID(): string {
        return this.type   
    }
}
// gets advantage of looping through array aka good cache locality and also fast addition and deletion
// takes more memory though 
// also every add and delete operation now has update the index map
// so its just a map with better cache coherance but forced to do an additional hash map update every add and delete operation
// search requires a hashmap call no different than a normal map
// Definitely not worth it over a normal map
class VectorizedMap<T> extends Container<T> {
    data: [number,T][] = []
    indexMap: Map<number, number> = new Map()
    type: string
    constructor(type: T) {
        super()
        this.type = typeof type
    }
    add() : void {

    }
    get(id: number): T | undefined{
        let idx = this.indexMap.get(id)
        if (idx != undefined || idx != null) {
            let item = this.data[idx]
            return item[1]
        } else {
            return undefined
        }
    }
    iterate(callback:(item: [ number, T]) => void): void {
        for (let i of this.data) {
            callback(i)
        }
    }
    remove(id:number) {
        let idx = this.indexMap.get(id)
        if (idx != undefined || idx != null) {
            let item = this.data[idx]
            this.indexMap.delete(item[0])
            return item[1]
        } else {
            return undefined
        }

    }
    getTypeID(): string {
        return this.type   
    }
}