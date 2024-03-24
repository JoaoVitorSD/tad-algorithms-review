import { useEffect } from "react";
import { useState } from "react";

export default function useTAD(tadClass) {

    const [tad, setTad] = useState(null);
    const [render, setRender] = useState([]);
    const [operations, setOperations] = useState({});

    useEffect(() => {
        setTad(new tadClass());

        ()=> setTad(null);
    }, [])

    useEffect(() => {
        if(tad){
            setOperations(tad.getOperations());
        }
    }, [tad])

    function add(value){
        tad.add(value);
        if(tad.render){
            setRender(tad.render());
        }else{
            console.log("That not contains render method");
        }
    };

    function heap(){
        return tad ? tad.getHeap() : null;
    }
    function reload(){
        setRender(tad.render());
    }

    return { render,reload,add, heap,operations }
}
