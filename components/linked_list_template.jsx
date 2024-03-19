import LinkedList from "@tad/LinkedList";
import DataStyle from "@styles/data.module.css";
import { useEffect, useState } from "react";
import useTAD from "@hook/useTAD";

export default function LinkedListTemplate() {
    const { render,reload, add, operations } = useTAD(LinkedList);


    const [numberInput, setNumerInput] = useState(0);
    return (
        <div className={DataStyle["tad-container"]}>
            <h1>Linked List</h1>
            <form onSubmit={(e)=>{e.preventDefault();add(numberInput); setNumerInput(parseInt(numberInput)+1)}} className={DataStyle["form-container"]}>
                <input type="number" value={numberInput} onChange={(e) => setNumerInput(e.target.value)} />
                <button>+</button>
                <button type="button" onClick={()=> {operations.invert();reload()}}>rotate</button>
                <button type="button" onClick={()=> {operations.clear();reload()}}>clear</button>
            </form>

            <div className={DataStyle["tad-elements-container"]}>
            {render}
            </div>
        </div>
    );
}