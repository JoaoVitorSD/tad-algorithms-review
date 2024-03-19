import Arrow from "./arrow";
import DataStyle from "@styles/data.module.css";

export default function Leaf({ value,xpos, ypos, last }: any) {
  return (
      <div
        className={`${DataStyle.leaf} ${
          last ? DataStyle["leaf--last"] : ''
        }`}
        style={{left: xpos+"px", top: ypos+"px"}}
      >
        {value}
      </div>
  );
}
