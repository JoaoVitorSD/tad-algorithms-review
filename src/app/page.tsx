"use client";
import Image from "next/image";
import styles from "./page.module.css";
import LinkedList from "@tad/LinkedList";
import { useState } from "react";

export default function Home() {
  let list = new LinkedList();
  
  for(let i =0;i<10;i++){
    list.add(i);
  }
  return (
    <main className={styles.main}>
      <div className={styles.boxes}>{list.render()}</div>
      <button onClick={()=> list.invert()}>Inverte aqui</button>
    </main>
  );
}
