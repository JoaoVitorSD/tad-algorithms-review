import Leaf from "@components/Leaf";
import Node from "./TreeNode";
import DataStyle from "@styles/data.module.css";
import AbsoluteArrow from "@components/arrow_absolute"
import HeapExecution from "./Heap";

import {showSucessToast, showErrorToast} from "@components/toast/showToast"
export default class BinaryTree {

    constructor() {
        this.root = null;
        this.CELL_SPACING_VERTICALLY = 40;
        this.CELL_SPACING_HORIZONTALLY = 50;
        this.last = null;
        this.currentLooking = null;
        this.heap = new HeapExecution();
    }

    add(value) {

        if (this.root === null) {
            this.root = new Node(value);
            return;
        }

        this.addRec(null,this.root, value)
    }
    addRec(prev,current, value) {
        if (current == null) {
            this.last = new Node(value)
            this.last.prev = prev;
            return this.last;
        }
        if(current.value===value){
            return current;
        }

        if (current.value>value) {
            current.left = this.addRec(current,current.left, value)
        } else {
            current.right = this.addRec(current,current.right, value);
        }

        return current;
    }

    print() {
        if (this.root === null) {
            return;
        }
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
    find(value){
        this.findRec(this.root, value);
    }
    findRec(current, value){
        if(current===null){
            return false;
        }
        this.forwardLooking(current);
        if(current.value == value){
            this.killHeap("Valor encontrado", true);
            return;
        }
        if(current.value>value){
            this.heap.add(()=>this.findRec(current.left, value));
        }else{
            this.heap.add(() => this.findRec(current.right, value));
        }
    }

    forwardLooking(currentLoking){
        if (this.currentLooking !=null){
            this.currentLooking.looking = false;
        }
        this.currentLooking = currentLoking;
        this.currentLooking.looking = true;
    }
    render() {
        return this.renderRec(this.root,0,0);
    }

    killHeap(message, sucess){
        this.heap.clear();
        if(this.currentLooking!=null){
            this.currentLooking.looking = false;
        }
        if(sucess){
            showSucessToast(message);
        }
        else{
            showErrorToast(message)
        }
    }
    renderRec(current, xpos, ypos) {
        if (current === null) {
            return null;
        }
        const NEW_X_POS_LEFT = xpos - this.CELL_SPACING_HORIZONTALLY;
        const NEW_X_POS_RIGHT = xpos + this.CELL_SPACING_HORIZONTALLY;
        const NEW_Y_POS = ypos + this.CELL_SPACING_VERTICALLY;
        return <>
            {current.left != null ? <AbsoluteArrow xpos={xpos} ypos={ypos} direction="left" />: null}
            {this.renderRec(current.left, NEW_X_POS_LEFT, NEW_Y_POS)}
            <Leaf value={current.value} looking={current.looking} xpos={xpos} ypos={ypos} last={this.last ===current} />
            {current.right != null ? <AbsoluteArrow xpos={xpos} ypos={ypos} direction="right" />: null}
            {this.renderRec(current.right, NEW_X_POS_RIGHT, NEW_Y_POS)}
        </>

    }
    preOrder(current) {
        if (current == null) {
            return;
        }
        this.forwardLooking(current);
        console.log(current.value);
        this.heap.add(() => this.preOrder(current.right));
        this.heap.add(() => this.preOrder(current.left));
    }
    inOrder(current) {
        if (current == null) {
            return;
        }
        this.inOrder(current.left);
        console.log(current.value);
        this.inOrder(current.right);
    }
    posOrder(current) {
        if (current == null) {
            return;
        }
        this.forwardLooking(current);
        this.heap.add(() => this.posOrder(current.right));
        this.heap.add(() => this.posOrder(current.left));
        this.heap.add(() => console.log(current.value));
    }
    clear(){
        this.clearRec(this.root);
        this.root = null;
    }

    clearRec(current){
        if(current===null){
            return;
        }
        this.clearRec(current.left);
        this.clearRec(current.right);

        current.left = null;
        current.right = null;
    }
    getHeap(){
        return this.heap;
    }
    getOperations() {
        return [ {name:"print",action:()=>this.print()}, {name:"render",action:()=> this.render()}, {name:"clear", action:()=>this.clear() }
            , { name: "find", action: (value) => this.find(value), requiresInput: true}
            , { name: "TAD", action: () => console.log(this)},
            , { name: "preOrder", action: () => this.preOrder(this.root)},
            , { name: "inOrder", action: () => this.inOrder(this.root)},
            , { name: "posOrder", action: () => this.posOrder(this.root)},
] ;
    }
}