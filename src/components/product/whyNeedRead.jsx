import { useState } from "react";
import BigPopUp from "./bigPopUp";
import css from "./product.module.css";

export default function WhyNeedRead({ oneProd }) {
  const [popVisible, setPopVisible] = useState(false);
  const [dataForPop, setDataForPop] = useState("");

  const bipPopUp = (el) => {
    setPopVisible(true);
    setDataForPop(el);
  };

  return (
    <div className={css.whyNeedWrapp}>
      <div className={css.whyNeedWrappSmall}>
        <h2 className={css.whyNeedH2}>Чому варто читати цю книгу? </h2>
        <div className={css.whyNeedBlock}>
          <div className={css.blockWhy}>{oneProd.whyNeedReadO}</div>
          <div className={css.blockWhy}>{oneProd.whyNeedReadT}</div>
          <div className={css.blockWhy}>{oneProd.whyNeedReadTH}</div>
        </div>
        <div className={css.wrapRecent}>
          <div className={css.startText}>
            {oneProd.labelOneText.length > 1 && (
              <div
                className={css.startTextFirst}
                onClick={() => bipPopUp(oneProd.labelOneText)}
              >
                {oneProd.labelOneName}
              </div>
            )}
            {oneProd.labelTwoText.length > 1 && (
              <div
                className={css.startTextSecond}
                onClick={() => bipPopUp(oneProd.labelTwoText)}
              >
                {oneProd.labelTwoName}
              </div>
            )}
            {oneProd.labelThreText.length > 1 && (
              <div
                className={css.startTextThree}
                onClick={() => bipPopUp(oneProd.labelThreText)}
              >
                {oneProd.labelThreName}
              </div>
            )}
          </div>
          <div className={css.startText}>
            {oneProd.labelFourName.length > 1 && (
              <div
                className={css.startTextSecondFirst}
                onClick={() => bipPopUp(oneProd.labelFourText)}
              >
                {oneProd.labelFourName}
              </div>
            )}
            {oneProd.labelFiveText.length > 1 && (
              <div
                className={css.startTextSecondSecond}
                onClick={() => bipPopUp(oneProd.labelFiveText)}
              >
                {oneProd.labelFiveName}
              </div>
            )}
          </div>
        </div>
      </div>
      {popVisible && (
        <BigPopUp dataForPop={dataForPop} setPopVisible={setPopVisible} />
      )}
    </div>
  );
}
