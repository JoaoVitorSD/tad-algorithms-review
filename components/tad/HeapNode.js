export default class Node{
    constructor(action, prev){
        this.action = action;
        this.prev = prev;
        this.next = null;
    }

    hasNext(){
        return this.next!=null;
    }
    hasPrev(){
        return this.prev !=null;
    }
    pointTo(next){
        this.next = next;
    }

    run(){
        this.action();
    }

}