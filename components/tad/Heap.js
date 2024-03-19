import Node from "./HeapNode"
export default class HeapExecution {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    add(action) {
        console.log("ADDING ", action);
        this.size++;
        if (this.head === null) {
            this.head = new Node(action, null);
            this.tail = this.head;
            return true;
        }
        const newNode = new Node(action, this.tail);
        this.tail.pointTo(newNode)
        this.tail = newNode;
    }

    run() {
        if (this.tail === null) {
            console.log("The heap is empty")
            return;
        }
        this.size--;
        if (this.tail === this.head) {
            let tail = this.tail;
            this.tail = null;
            this.head = null;
            tail.run();
            return
        }
        let auxTail = this.tail;
        this.tail = auxTail.prev;
        this.tail.next = null;
        auxTail.run();
    }

    clear() {
        if (this.head != null) {
            this.size = 0
            let current = this.head;

            while (current.hasNext()) {
                let prev = current;
                current = current.next;
                prev.next = null;
            }
        }
    }


}