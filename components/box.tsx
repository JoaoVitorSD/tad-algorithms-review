import Arrow from "./arrow";
import DataStyle from "@styles/data.module.css";

export default function Box({ value,last, arrow }: any) {
  return (
    <>
      <div className={`${DataStyle.box} ${last? DataStyle["box--last"]: false}`}>{value}</div>
      <Arrow direction={arrow} />
    </>
  );
}
