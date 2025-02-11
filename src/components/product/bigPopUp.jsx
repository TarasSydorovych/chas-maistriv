import css from "./product.module.css";
import iconSrc from "../../svg/xCardIcon.svg";
import { HandySvg } from "handy-svg";

export default function BigPopUp({ dataForPop, setPopVisible }) {
  const closeSet = () => {
    setPopVisible(false);
  };

  return (
    <div className={css.bigPopUpWrap}>
      <HandySvg
        src={iconSrc}
        width="28"
        className={css.countSvg}
        height="28"
        onClick={closeSet}
      />
      {/* <p className={css.paragrafToPopUp}>
                    {dataForPop}
                    </p> */}
      <div
        className={css.paragrafToPopUp}
        dangerouslySetInnerHTML={{ __html: dataForPop }}
      />
    </div>
  );
}
