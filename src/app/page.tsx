"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import LinkedListTemplate from "@components/linked_list_template";
import BynaryTreeTemplate from "@components/bynaray_tree_template";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [opened, setOpened] = useState(false);

  const options = [
    { title: "Lista Encadeada", component: <LinkedListTemplate /> },
    { title: "Bynary Tree", component: <BynaryTreeTemplate /> },
  ];

  const [body, setBody] = useState<any>(null);

  const randomPos = (arr: any[]) => {
    return arr[parseInt((arr.length * Math.random()).toFixed(2))];
  };
  useEffect(function setRandomPos() {
    setBody(randomPos(options).component);
  }, []);
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        {opened ? (
          <nav className={styles.nav}>
            <ul className={styles.ul}>
              {options.map((option, index) => (
                <li
                  key={index}
                  className={styles["list-option"]}
                  onClick={() => setBody(option.component)}
                >
                  {option.title}
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        <div className={`${styles.menu} ${
              opened ? styles["menu--revealed"] : false
            }`} onClick={() => setOpened(!opened)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${styles.icon} ${
              opened ? styles["icon--revealed"] : false
            }`}
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </div>
      </section>

      {body}
      <ToastContainer />
    </main>
  );
}
