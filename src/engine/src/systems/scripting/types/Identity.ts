import { Containable } from "./Containers"

class Identity {
    id: number
    components: [number, Containable][] = []
    constructor(id: number) {
        this.id = id
    }
    addComponent<T>(...type:T[]) {
        //System.addComponent<...T>()
        /**
         * for (let i of type) {
         *      containableReference is class With metadata on index information
         *      let containableReference = system.addComponent<T>(i)
         *      components.push(containableReference)
         *      
         * }
         *
         */
        
    }
    remove() {

    }
}

