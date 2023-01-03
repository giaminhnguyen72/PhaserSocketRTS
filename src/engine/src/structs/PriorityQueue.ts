class DataNode<T> {
    data: T
    priority: number
    constructor(data:T, priority: number) {
        this.data = data
        this.priority = priority
    }
}
class PriorityQueue<T> {

    private items: DataNode<T>[];
  
    constructor() {
      this.items = [];

    }
    swap(idx1: number, idx2: number) {
        var tmp = this.items[idx1]
        this.items[idx1] = this.items[idx2]
        this.items[idx2] = tmp
    }
    // Add an item to the queue
    enqueue(item: T, priority: number) {
      this.items.push(new DataNode<T>(item, priority));
      var idx: number = this.items.length - 1
      var parentIdx = Math.floor((idx-1)/2)
      while (idx !== 0 && this.items[idx].priority > this.items[parentIdx].priority) {
        this.swap(idx, parentIdx)
        idx = parentIdx
        parentIdx = Math.floor((idx-1)/2)
      }
      
    }
  
    // Remove and return the highest priority item from the queue
    dequeue(): T | undefined {
      return this.items.shift()?.data;
    }
  
    // Return the highest priority item from the queue without removing it
    peek(): T | undefined {
      return this.items[0]?.data;
    }
  
    // Check if the queue is empty
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  }