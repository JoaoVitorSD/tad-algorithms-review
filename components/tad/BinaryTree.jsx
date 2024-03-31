import Leaf from "@components/Leaf";
import Node from "./TreeNode";
import AbsoluteArrow from "@components/arrow_absolute"
import HeapExecution from "./Heap";
import QueueExecution from "./Queue";
import { useState } from "react";

export default class BinaryTree {

    constructor(reload) {
        this.root = null;
        this.CELL_SPACING_VERTICALLY = 40;
        this.CELL_SPACING_HORIZONTALLY = 50;
        this.last = null;
        this.currentLooking = null;
        this.reload = reload;
    }


    setSpacingHorizontally(size){
        this.CELL_SPACING_HORIZONTALLY = size;
    }
    setSpacingVertically(size) {
        this.CELL_SPACING_VERTICALLY = size;
    }

    add(value) {

        if (this.root === null) {
            this.root = new Node(value);
            return;
        }

        this.addRec(null, this.root, value)

        
    }
    addRec(prev, current, value) {
        if (current == null) {
            this.last = new Node(value)
            this.last.prev = prev;
            return this.last;
        }
        if (current.value === value) {
            return current;
        }

        if (current.value > value) {
            current.left = this.addRec(current, current.left, value)
        } else {
            current.right = this.addRec(current, current.right, value);
        }

        return current;
    }

    print() {
        if (this.root === null) {
            return;
        }
        this.heap = new HeapExecution({});
        this.printRec(this.root);
    }

    printRec(current) {
        this.switchLooking(current);
        if (current === null) {
            return;
        }
        console.log(current.value);
        this.printRec(current.left);
        this.printRec(current.right);
    }
    find(value) {
        this.heap = new HeapExecution({
            sucessMessageIfBecameEmpty: `O elemento ${value} foi encontrado`,
            warningMessageIfBecameEmpty: "O Elemento não foi encontrado",
            clearMarkedElements: () => this.currentLooking.looking = false,
        });
        this.findRec(this.root, value);
    }
    findRec(current, value) {
        if (current === null) {
            return false;
        }
        this.forwardLooking(current);
        if (current.value == value) {
            this.heap.executedWithSucess = true;
            return;
        }
        if (current.value > value) {
            this.heap.add({ action: () => this.findRec(current.left, value), condition: current.left });
        } else {
            this.heap.add({ action: () => this.findRec(current.right, value), condition: current.right });
        }
    }
    forwardLooking(currentLoking) {
        if (this.currentLooking != null) {
            this.currentLooking.looking = false;
        }
        this.currentLooking = currentLoking;
        this.currentLooking.looking = true;
    }
    render() {
        const renderRec = (current, xpos, ypos) => {
            if (current === null) {
                return null;
            }
            const NEW_X_POS_LEFT = xpos - this.CELL_SPACING_HORIZONTALLY;
            const NEW_X_POS_RIGHT = xpos + this.CELL_SPACING_HORIZONTALLY;
            const NEW_Y_POS = ypos + this.CELL_SPACING_VERTICALLY;
            return <>
                {current.left != null ? <AbsoluteArrow xpos={xpos} ypos={ypos} direction="left" /> : null}
                {renderRec(current.left, NEW_X_POS_LEFT, NEW_Y_POS)}
                <Leaf value={current.value} looking={current.looking} xpos={xpos} ypos={ypos} last={this.last === current} />
                {current.right != null ? <AbsoluteArrow xpos={xpos} ypos={ypos} direction="right" /> : null}
                {renderRec(current.right, NEW_X_POS_RIGHT, NEW_Y_POS)}
            </>

        }
        return renderRec(this.root, 0, 0);
    }

    preOrder() {
        this.heap = this.getForwardingHeap("Pre Order");
        const preOrderRec = (current) => {
            if (current == null) {
                return;
            }
            this.heap.add({ action: () => preOrderRec(current.right), condition: current.right, autoForward: true });
            this.heap.add({ action: () => preOrderRec(current.left), condition: current.left, autoForward: true });
            this.heap.add({ action: () => this.forwardLooking(current)});
        }
        preOrderRec(this.root);
    }

    inOrder() {
        this.heap = this.getForwardingHeap("In Order");
        const inOrderRec = (current) => {
            if (current == null) {
                return;
            }
            this.heap.add({ action: () => inOrderRec(current.right), condition: current.right, autoForward: true });
            this.heap.add({ action: () => this.forwardLooking(current)});
            this.heap.add({ action: () => inOrderRec(current.left), condition: current.left, autoForward: true });
        }
        inOrderRec(this.root);
    }
    posOrder() {
        this.heap = this.getForwardingHeap("Pos Order");
        const posOrderRec = (current) => {
            if (current == null) {
                return;
            }
            this.heap.add({ action: () => this.forwardLooking(current)});
            this.heap.add({ action: () => posOrderRec(current.right), condition: current.right, autoForward: true });
            this.heap.add({ action: () => posOrderRec(current.left), condition: current.left, autoForward: true  });
        }
        posOrderRec(this.root);
    }
    byLevel(){
        this.heap = this.getForwardingQueue("By Level");
        const byLevelRec = (current) => {
            if (current == null) {
                return;
            }
            this.forwardLooking(current);
            this.heap.add({ action: () => { byLevelRec(current.left) }, condition: current.left, autoForward: true });
            this.heap.add({ action: () => { byLevelRec(current.right) }, condition: current.right, autoForward: true });
        }
        byLevelRec(this.root);

    }
    getForwardingHeap(type) {
        return new HeapExecution({ sucessMessageIfBecameEmpty: type + " finished", clearMarkedElements: () => this.clearCurrentLooking(), reload:()=> this.reload() });
    }
    getForwardingQueue(type) {
        return new QueueExecution({ sucessMessageIfBecameEmpty: type + " finished", clearMarkedElements: () => this.clearCurrentLooking(), reload:()=> this.reload() });
    }

    invert(){
        const invertRec = (current)=>{
            if(current==null){
                return;
            }
            invertRec(current.left);
            invertRec(current.right);
            let auxLeft = current.left;
            current.left = current.right;
            current.right = auxLeft;
        }
        invertRec(this.root);
    }
    clear() {
        this.clearRec(this.root);
        this.root = null;
    }

    clearRec(current) {
        if (current === null) {
            return;
        }
        this.clearRec(current.left);
        this.clearRec(current.right);

        current.left = null;
        current.right = null;
    }
    clearCurrentLooking() {
        if (this.currentLooking) {
            this.currentLooking.looking = false;
            this.currentLooking = null;
        }
    }
    getHeap() {
        return this.heap;
    }
    getOperations() {
        return [{ name: "print", action: () => this.print() }, { name: "render", action: () => this.render() }, { name: "clear", action: () => this.clear() }
            , { name: "find", action: (value) => this.find(value), requiresInput: true }
            , { name: "TAD", action: () => console.log(this) },
            , { name: "pre Order", action: () => this.preOrder() },
            , { name: "in Order", action: () => this.inOrder() },
            , { name: "pos Order", action: () => this.posOrder() },
            , { name: "by level", action: () => this.byLevel() },
            , { name: "invert", action: () => this.invert() },
        ];
    }
}