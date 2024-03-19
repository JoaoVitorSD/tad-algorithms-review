import BinaryTree from "@tad/BinaryTree";
import DataStyle from "@styles/data.module.css";
import { useEffect, useState } from "react";
import useTAD from "@hook/useTAD";

export default function BinaryTreeTemplate() {
    const { render, reload, add, operations } = useTAD(BinaryTree);


    const [numberInput, setNumerInput] = useState(0);

    function changeNumerInput() {
        const number = parseInt(numberInput);
        const value = number < 0 ? number - 1 : number + 1;
        setNumerInput(value);

        add(number);
    }
    return (
        <div className={DataStyle["tad-container"]}>
            <h1>Bynary Tree</h1>
            <form onSubmit={(e) => { e.preventDefault(); changeNumerInput() }} className={DataStyle["form-container"]}>
                <input type="number" value={numberInput} onChange={(e) => setNumerInput(e.target.value)} />
                <button>Add</button>

                {operations&&operations.length&&operations.map((operation,index) => {
                    return <button key={index} type="button" onClick={() => { operation.action(); reload() }}>{operation.name}</button>

                })}
            </form>

            <div className={DataStyle["tad-elements-container"]}>
                <div className={DataStyle["tree-elements-container"]}>
                    {render}
                </div>
            </div>
        </div>
    );
}