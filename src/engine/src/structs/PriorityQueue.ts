interface DataNode<T> {
    data: T
    priority: number
}
class PriorityQueue<T> {

    private items: DataNode<T>[] = [];
    size: number = 0

    swap(idx1: number, idx2: number) {
        var tmp = this.items[idx1]
        this.items[idx1] = this.items[idx2]
        this.items[idx2] = tmp
    }
    // Add an item to the queue
    enqueue(item: T, priority: number) {
      this.items.push({
        data: item,
        priority: priority
      });
      let idx: number = this.items.length - 1
      var parentIdx = Math.floor((idx-1)/2)
      while (idx > 0 && this.items[idx].priority > this.items[parentIdx].priority) {
        this.swap(idx, parentIdx)
        idx = parentIdx
        parentIdx = Math.floor((idx-1)/2)
      }
      this.size++
      
    }
  
    // Remove and return the highest priority item from the queue
    dequeue(): T | undefined {
      if (this.size == 0) {
          return undefined
      }
      let popped = this.items[0]
      this.size--
      let last = this.items.pop()
      if (last) {
        this.items[0] = last
      } 
      
      
      let idx = 0
      while (idx <= this.size - 1) {
          let left = 2 * idx + 1
          let right = 2 * idx + 2
          if (left <= this.size - 1 && right <= this.size - 1) {
              let childIdx = this.items[left].priority > this.items[right].priority ? left : right
              if (this.items[childIdx].priority > this.items[idx].priority) {
                this.swap(idx, childIdx)
              }

          } else if (left <= this.size -1) {
              if (this.items[left].priority > this.items[idx].priority) {
                this.swap(idx, left)
              }
          } else {
            
          }

      }
    }

  }