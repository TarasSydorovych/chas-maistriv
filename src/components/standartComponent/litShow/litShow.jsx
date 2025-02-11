// import css from "./litShow.module.css";

// import kurluk from "../../../img/kurluk.png";
// import withFirebaseCollection from "../../HOK/withFirebaseCollection";

// const LitShow = ({ data }) => {
//   return (
//     <>
//       <div className={css.umovaBlockWrap}>
//         <img src={kurluk} className={css.kurlukSt} />
//         <p className={css.umpvuP}>Умови проведення літшоу</p>
//       </div>
//       {/* блок умови проведення */}
//       <div className={css.umWrap}>
//         <div className={css.profesion}>
//           <h1 className={css.profesionDescH1}>
//             Для професійної публіки на конференціях і семінарах по всій Україні
//             безкоштовно Поза Києвом
//           </h1>
//           <p className={css.profesionDescP}>
//             Безоплатно, за умови участі понад 20 осіб.
//           </p>
//         </div>
//         <div className={css.profButtonWrap}>
//           <button className={css.buttonOrderProf}>Обговорити замовлення</button>
//           <button className={css.buttonOrderAdd}>
//             Додати до переліку бажань
//           </button>
//         </div>
//       </div>
//       {/* блок умови проведення */}
//       <div className={css.umWrap}>
//         <div className={css.profesion}>
//           <h1 className={css.profesionDescH1}>
//             Для продавців книг по всій Україні безкоштовно Поза Києвом
//           </h1>
//           <p className={css.profesionDescP}>
//             Безоплатно/обмеження тільки з урахуванням ресурсів автора.
//           </p>
//         </div>
//         <div className={css.profButtonWrap}>
//           <button className={css.buttonOrderProf}>Замовити</button>
//           <button className={css.buttonOrderAdd}>
//             Додати до переліку бажань
//           </button>
//         </div>
//       </div>
//       {/* блок умови проведення */}
//       <div className={css.umWrap}>
//         <div className={css.profesion}>
//           <h1 className={css.profesionDescH1}>Для шкіл, садочків, батьків</h1>
//           <p className={css.profesionDescP}>
//             В Києві замовити книг на сумму 3000 грн
//           </p>
//           <p className={css.profesionDescP}>В Києві гонорар 1000 грн</p>
//           <p className={css.profesionDescP}>
//             Поза Києвом замовити книг на сумму 6000 грн
//           </p>
//           <p className={css.profesionDescP}>Поза Києвом гонорар 2000 грн</p>
//         </div>
//         <div className={css.profButtonWrap}>
//           <button className={css.buttonOrderProf}>Замовити</button>
//           <button className={css.buttonOrderAdd}>
//             Додати до переліку бажань
//           </button>
//         </div>
//       </div>
//       <div className={css.lite}></div>
//     </>
//   );
// };
// export default withFirebaseCollection("litShow")(LitShow);
import React, { useState, useEffect } from "react";
import css from "./litShow.module.css";
import kurluk from "../../../img/kurluk.png";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Імпорт Firebase конфігурації

const LitShow = () => {
  const [showData, setShowData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "litShow", "showSettings");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setShowData(docSnap.data());
        } else {
          console.log("Документ не знайдено");
        }
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };

    fetchData();
  }, []);

  if (!showData) {
    return <p>Завантаження даних...</p>;
  }

  return (
    <>
      <div className={css.umovaBlockWrap}>
        <img src={kurluk} className={css.kurlukSt} alt="kurluk" />
        <p className={css.umpvuP}>
          {showData.umovuText || "Умови проведення літшоу"}
        </p>
      </div>

      {/* Блок 1 */}
      <div className={css.umWrap}>
        <div className={css.profesion}>
          <h1 className={css.profesionDescH1}>
            {showData.block1Title ||
              "Для професійної публіки на конференціях і семінарах по всій Україні безкоштовно Поза Києвом"}
          </h1>
          <p className={css.profesionDescP}>
            {showData.block1Desc ||
              "Безоплатно, за умови участі понад 20 осіб."}
          </p>
        </div>
        <div className={css.profButtonWrap}>
          <button
            className={css.buttonOrderProf}
            onClick={() => window.open(showData.buttonOrderLink1, "_blank")}
          >
            {showData.buttonOrderText1 || "Обговорити замовлення"}
          </button>
          <button className={css.buttonOrderAdd}>
            Додати до переліку бажань
          </button>
        </div>
      </div>

      {/* Блок 2 */}
      <div className={css.umWrap}>
        <div className={css.profesion}>
          <h1 className={css.profesionDescH1}>
            {showData.block2Title ||
              "Для продавців книг по всій Україні безкоштовно Поза Києвом"}
          </h1>
          <p className={css.profesionDescP}>
            {showData.block2Desc ||
              "Безоплатно/обмеження тільки з урахуванням ресурсів автора."}
          </p>
        </div>
        <div className={css.profButtonWrap}>
          <button
            className={css.buttonOrderProf}
            onClick={() => window.open(showData.buttonOrderLink2, "_blank")}
          >
            {showData.buttonOrderText2 || "Замовити"}
          </button>
          <button className={css.buttonOrderAdd}>
            Додати до переліку бажань
          </button>
        </div>
      </div>

      {/* Блок 3 */}
      <div className={css.umWrap}>
        <div className={css.profesion}>
          <h1 className={css.profesionDescH1}>
            {showData.block3Title || "Для шкіл, садочків, батьків"}
          </h1>
          <p className={css.profesionDescP}>
            {showData.block3Desc1 || "В Києві замовити книг на сумму 3000 грн"}
          </p>
          <p className={css.profesionDescP}>
            {showData.block3Desc2 || "В Києві гонорар 1000 грн"}
          </p>
          <p className={css.profesionDescP}>
            {showData.block3Desc3 ||
              "Поза Києвом замовити книг на сумму 6000 грн"}
          </p>
          <p className={css.profesionDescP}>
            {showData.block3Desc4 || "Поза Києвом гонорар 2000 грн"}
          </p>
        </div>
        <div className={css.profButtonWrap}>
          <button
            className={css.buttonOrderProf}
            onClick={() => window.open(showData.buttonOrderLink3, "_blank")}
          >
            {showData.buttonOrderText3 || "Замовити"}
          </button>
          <button className={css.buttonOrderAdd}>
            Додати до переліку бажань
          </button>
        </div>
      </div>

      <div className={css.lite}></div>
    </>
  );
};

export default LitShow;
