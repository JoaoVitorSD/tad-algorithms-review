import DataStyle from "@styles/data.module.css";

const arrows: any = {
  left: "<-",
  right: "->",
};

export default function Arrow({ direction, rotate }: any) {
  return (
    <span className={DataStyle.arrow}>
      {direction ? arrows[direction] : false}
    </span>
  );
}
