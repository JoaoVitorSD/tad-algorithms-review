import { useEffect } from "react";
import { useState } from "react";

export default function useTAD(tadClass) {

    const [tad, setTad] = useState();
    const [render, setRender] = useState([]);

    useEffect(() => {
        setTad(new tadClass());


        ()=> setTad([]);
    }, [])

    const add = (value) => {
        console.log(tad)
        tad.add(value);
        setRender(tad.render());
    };




    return { render, add }
}
