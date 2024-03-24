import BinaryTree from "@tad/BinaryTree";
import DataStyle from "@styles/data.module.css";
import { useEffect, useState } from "react";
import useTAD from "@hook/useTAD";
import HeapController from "@components/heap"
export default function BinaryTreeTemplate() {
    const [mustReload, setMustReload] = useState(false);
    const { render, reload, add,heap, operations } = useTAD(BinaryTree, ()=> setMustReload(true));

    useEffect(function reloadView(){
        if(mustReload){
            reload();
            setMustReload(false);
        }
        return ()=> setMustReload(false);
    },[])

    const [numberInput, setNumerInput] = useState(0);

    function changeNumerInput() {
        const number = parseInt(numberInput);
        const value = number < 0 ? number - 1 : number + 1;
        setNumerInput(value);
        add(number);
    }

    function genBaseTree(){
        add(20);
        add(10);
        add(30);
        add(15);
        add(5);
        add(6);
        add(4);
        add(35);
        add(34);
        add(36);
    }
    return (
        <div className={DataStyle["tad-container"]}>
            <h1>Bynary Tree</h1>
            <form onSubmit={(e) => { e.preventDefault(); changeNumerInput() }} className={DataStyle["form-container"]}>
                <input type="number" value={numberInput} onChange={(e) => setNumerInput(e.target.value)} />
                <button>Add</button>

                {operations && operations.length && operations.map((operation, index) => {
                    return <button key={index} type="button" onClick={() => {
                        operation.requiresInput ? operation.action(numberInput) : operation.action();
                        reload();
                    }
                    }>{operation.name}</button>

                })}
                <button type="button" onClick={genBaseTree}>Gen Base Tree</button>
            </form>
            <HeapController heap={heap ? heap(): null} reload={reload}/>

            <div className={DataStyle["tad-elements-container"]}>
                <div className={DataStyle["tree-elements-container"]}>
                    {render}
                </div>
            </div>
        </div>
    );
}