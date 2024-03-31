import { showErrorToast, showSucessToast, showWarningToast } from "@components/toast/showToast";
import Node from "./ActionNode"
export default class QueueExecution {
    constructor({ sucessMessageIfBecameEmpty,warningMessageIfBecameEmpty, clearMarkedElements}) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.sucessMessageIfBecameEmpty = sucessMessageIfBecameEmpty;
        this.warningMessageIfBecameEmpty = warningMessageIfBecameEmpty;
        this.clearMarkedElements = clearMarkedElements;
        this.executedWithSucess = false;
    }
    /**
     * @param action function that will be executed
     * @param condition conditional to add the action to queue
     */
    add({action, condition}) {
        if (condition!==undefined&&!condition) {
            return;
        }
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
        if (this.head === null) {
            console.log("The queue is empty")
            return;
        }
        this.size--;
        if (this.tail === this.head) {
            let head = this.head;
            this.tail = null;
            this.head = null;
            head.run();
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
        let auxHead = this.head;
        this.head = this.head.next;
        this.head.prev = null;

        auxHead.next = null;
        auxHead.run();

    }

    clear() {
        if(this.clearMarkedElements){
            setTimeout(this.clearMarkedElements, 500);
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