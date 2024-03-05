import styles from "/src/app/page.module.css";


export default function Box({value}: any){
    return <div className={styles.box}>
        {value}
    </div>
}