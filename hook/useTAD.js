import { useEffect } from "react";
import { useState } from "react";

export default function useTAD(tadClass) {

    const [tad, setTad] = useState(null);
    const [render, setRender] = useState([]);
    const [operations, setOperations] = useState({});

    useEffect(() => {
        setTad(new tadClass());

        ()=> setTad([]);
    }, [])

    useEffect(() => {
        if(tad){
            setOperations(tad.getOperations());
        }
    }, [tad])

    function add(value){
        tad.add(value);
        console.log("That not contains render method");
        if(tad.render){
            setRender(tad.render());
        }
    };


    function reload(){
        console.log("Reloading");
        setRender(tad.render());
    }

    return { render,reload,add, operations }
}
