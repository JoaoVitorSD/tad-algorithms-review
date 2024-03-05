import LinkedList from "@tad/LinkedList";
import DataStyle from "@styles/data.module.css";
import { useEffect, useState } from "react";
import useTAD from "@hook/useTAD";

export default function LinkedListTemplate() {
    const { render, add } = useTAD(LinkedList);


    const [numberInput, setNumerInput] = useState(0);
    return (
        <div className={DataStyle["tad-container"]}>
            <h1>Linked List</h1>
            <form onSubmit={(e)=>{e.preventDefault();add(numberInput)}} className={DataStyle["form-container"]}>
                <input type="number" value={numberInput} onChange={(e) => setNumerInput(e.target.value)} />
                <button>+</button>
            </form>

            <div className={DataStyle["tad-elements-container"]}>
            {render}
            </div>
        </div>
    );
}