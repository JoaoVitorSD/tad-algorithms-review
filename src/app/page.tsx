"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import LinkedListTemplate from "@components/linked_list_template";

export default function Home() {
  return (
    <main className={styles.main}>
      <LinkedListTemplate />
    </main>
  );
}
