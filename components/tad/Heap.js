import { showErrorToast, showSucessToast, showWarningToast } from "@components/toast/showToast";
import Node from "./ActionNode"
export default class HeapExecution {
    constructor({ sucessMessageIfBecameEmpty,warningMessageIfBecameEmpty, clearMarkedElements, reload}) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.sucessMessageIfBecameEmpty = sucessMessageIfBecameEmpty;
        this.warningMessageIfBecameEmpty = warningMessageIfBecameEmpty;
        this.clearMarkedElements = clearMarkedElements;
        this.executedWithSucess = false;
        this.reload = reload;
    }
    /**
     * @param action function that will be executed
     * @param condition conditional to add the action to heap
     */
    add({ action, condition, autoForward }) {
        if (condition!==undefined&&!condition) {
            return;
        }
        this.size++;
        if (this.head === null) {
            this.head = new Node(action, null, autoForward);
            this.tail = this.head;
            return true;
        }
        const newNode = new Node(action, this.tail, autoForward);
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
            if(this.size==0){
                if(this.executedWithSucess){
                    showSucessToast(this.sucessMessageIfBecameEmpty);
                }else{
                    showWarningToast(this.warningMessageIfBecameEmpty);
                }
                this.clear();
            }
            return
        }
        let auxTail = this.tail;
        this.tail = auxTail.prev;
        this.tail.next = null;
        auxTail.run();
        if(this.tail.autoForward){
            this.run()
        }
    }

    clear() {
        if(this.clearMarkedElements){
            setTimeout(()=> this.clearMarkedElements(), 500)
        }
        if (this.head != null) {
            this.size = 0
            let current = this.head;

            while (current.hasNext()) {
                let prev = current;
                current = current.next;
                prev.next = null;
            }

            this.tail = null;
            this.size = 0;
        }
    }
    isEmpty(){
        return this.size===0;
    }

}