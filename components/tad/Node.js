export default class Node{
    constructor(value, prev){
        this.value = value;
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

}