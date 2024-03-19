import DataStyle from "@styles/data.module.css";

export default function HeapController({heap, reload}){

    return <div className={DataStyle["heap"]}>
        <p>Heap</p>
        <p>Size: {heap&&heap.size}</p>
        <button type="button" onClick={()=>{heap.run(); reload()}}>Run</button>
        <button type="button" onClick={()=>heap.clear()}>Clear</button>
    </div>
}