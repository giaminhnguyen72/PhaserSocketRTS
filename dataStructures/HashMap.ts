class HashNode<T> {
    data: T
    next: Node
    constructor(data?: T, next?: Node) {
        this.data = data
        this.next = next
    }
}
class HashMap<K, V>{
    map: Map<K,V>
    constructor() {
        this.map = new Map<K, V>()
    }
    add(): void {

    }
    get(): void {

    }
    delete
}