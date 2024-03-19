'use client';

import Box from "../components/box";
import Node from "./Node";

export default class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    add(value) {
        if (this.head === null) {
            this.head = new Node(value, null);
            this.tail = this.head;
            this.size++;
            return true;
        }
        let newNode = new Node(value, this.tail);
        this.tail.pointTo(newNode);
        this.tail = newNode;
        this.size++;
        return true;
    }

    render() {
        let current = this.head;
        let arr = new Array(this.size);

        for (let i = 0; i < this.size; i++) {
            let isLastElement = i===this.size-1;
            arr[i] = <Box key={i} value={current.value} last={isLastElement} arrow={isLastElement ?  false: "right"} />
            current = current.next;
        }
        return arr;
    }

    pop() {
        this.tail = this.tail.prev;
        this.tail.pointTo(null);
        this.size--;
    }

    remove(index) {
        if (this.size < index) {
            throw new Error("Index is bigger than actual size");
        }
        if (index === 0) {
            this.head = this.head.next;
            this.head.prev = null;
            this.size--;
            return;
        }
        if (this.size - 1 === index) {
            this.tail == this.tail.prev;
            this.tail.pointTo(null);
            this.size--;
            return
        }

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        current.prev.next = current.next;
        current.next.prev = current.prev;
        this.size--;

    }

    invert() {
        let current = this.tail;
        while(current.prev!=null){
            let oldNext = current.next, oldPrev = current.prev;
            current.next = current.prev;
            current.prev = oldNext;
            current = oldPrev;
        }
        let oldHead = this.head;
        this.head = this.tail;
        this.head.prev = null;
        this.tail = oldHead;
        this.tail.prev = current.next;
        this.tail.next =null;
    }

    print() {
        let current = this.head;

        while (current != null) {
            console.log(current.value);
            current = current.next;
        }
    }
    clear(){
        let current = this.head;
        while (current != null) {
            console.log(current.value);
            let next = current.next;
            current.next = null;
            current.prev = null;
            current = next;
        }
        this.size = 0;
        this.head = null;
        this.tail = null;
    }

    getOperations(){
        return { "invert": () => this.invert(), "clear": () => this.clear(), "print": this.print }
    }
}