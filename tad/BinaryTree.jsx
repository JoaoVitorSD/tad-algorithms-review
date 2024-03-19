import Leaf from "@components/Leaf";
import Node from "./TreeNode";
import DataStyle from "@styles/data.module.css";
import AbsoluteArrow from "@components/arrow_absolute"

export default class BinaryTree {

    constructor() {
        this.head = null;
        this.CELL_SPACING_VERTICALLY = 40;
        this.CELL_SPACING_HORIZONTALLY = 50;
        this.last = null;
    }

    add(value) {

        if (this.head === null) {
            this.head = new Node(value);
            return;
        }

        this.addRec(this.head, value)
    }
    addRec(current, value) {
        if (current == null) {
            this.last = new Node(value)
            return this.last;
        }

        if (current.value>value) {
            current.left = this.addRec(current.left, value)
        } else {
            current.right = this.addRec(current.right, value);
        }

        return current;
    }

    print() {
        if (this.head === null) {
            return;
        }
        this.printRec(this.head);
    }

    printRec(current) {
        if (current === null) {
            return;
        }
        console.log(current.value);
        this.printRec(current.left);
        this.printRec(current.right);
    }

    render() {
        return this.renderRec(this.head,0,0);
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
            <Leaf value={current.value} xpos={xpos} ypos={ypos} last={this.last ===current} />
            {current.right != null ? <AbsoluteArrow xpos={xpos} ypos={ypos} direction="right" />: null}
            {this.renderRec(current.right, NEW_X_POS_RIGHT, NEW_Y_POS)}
        </>

    }

    clear(){
        this.clearRec(this.head);
        this.head = null;
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
    getOperations() {
        return [ {name:"print",action:this.print}, {name:"render",action: this.render}, {name:"clear", action:this.clear() }] ;
    }
}