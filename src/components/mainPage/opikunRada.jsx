// import pictureBook from "../../img/opicunBooK.png";
// import PopUpRada from "../popUp/popUpRada";
// import { useState } from "react";

// export default function OpikunRada({ scrollHeight }) {
//   const [popupPosition, setPopupPosition] = useState("");
//   const [popUp, setPopUp] = useState(false);
//   const handleMouseEnter = () => {
//     calculatePopupPosition();
//     setPopUp(!popUp);
//   };
//   const calculatePopupPosition = () => {
//     // Отримайте позицію кнопки
//     const buttonPosition = document
//       .querySelector(".whoyIsOpRada")
//       .getBoundingClientRect();

//     // Отримайте розміри попапу
//     const popupHeight = 250; // Задайте висоту попапу (можете змінити за необхідністю)
//     setPopupPosition(buttonPosition.top);
//     // Обчисліть вертикальну позицію попапу
//     const topPosition = buttonPosition.top - popupHeight;
//     const element = document.querySelector(".musicWrapOp");

//     let needHeight = popupPosition + scrollHeight;
//     if (element) {
//       element.style.top = scrollHeight;
//     }
//   };
//   const handleApplyClick = () => {
//     window.open(
//       "https://docs.google.com/forms/d/18sZEW9Xpp5rWT661V_uNet7wkR61KNECOwKvao_MlwM/edit",
//       "_blank"
//     );
//   };
//   return (
//     <div className="newBooksWrapBlock">
//       <div className="GreenBlockMal">
//         <h1 className="HelpCreateBooks">
//           Ти можеш допомогти нам створити книгу!
//         </h1>

//         <p className="giveDiscount">
//           Запрошуємо прочитати рукопис залишити відгук і отримаєш 40% знижки на
//           покупку будь якої книги
//         </p>

//         <h1 className="nameBooksNewBooksMal">Ти і Малевич</h1>
//         <p className="descriptionOpikunBook">
//           «Ти і Малевич» — це книжка-альбом із творчими завданнями, наліпками,
//           розмальовками, яка дитині 5–13 років дає можливість уявити себе учнем
//           чи ученицею Казимира Малевича. Кожен розгорт книжки присвячено одній
//           із головних ідей художника, що спонукає не тільки читати й пізнавати,
//           а й самостійно створити свою версію «Чорного квадрата», супрематичну
//           композицію, проєкт планіту для земляніта, відкрити першоелементи,
//           безпредметність та зрозуміти персонажів картин Малевича, розмалювавши
//           їх по-своєму.
//         </p>
//         {popUp && (
//           <PopUpRada
//             popupPosition={popupPosition}
//             scrollHeight={scrollHeight}
//           />
//         )}
//         <button className="whoyIsOpRada" onClick={handleMouseEnter}>
//           Що таке опікунська рада
//         </button>
//       </div>

//       <div className="BorderWrapBlurOp">
//         <div className="imgPictureBox">
//           <img src={pictureBook} className="opicunPicture" alt={`picture`} />
//           <div className="markerSun">Скоро</div>
//         </div>
//         <button className="opRadaButton" onClick={handleApplyClick}>
//           Подати заявку на участь в опікунській раді
//         </button>

//         <div className="OpradaRelPrice">
//           <div className="OpradaRelPriceRotate">
//             <h2 className="salePriceOpRada">40%</h2>
//             <p className="fullPriceOpRada">знижка</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import pictureBook from "../../img/opicunBooK.png";
import PopUpRada from "../popUp/popUpRada";
import { useState, useEffect, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
export default function OpikunRada({ scrollHeight }) {
  const [popupPosition, setPopupPosition] = useState("");
  const [popUp, setPopUp] = useState(false);
  const popupRef = useRef(null);
  const [data, setData] = useState(null);
  const handleMouseEnter = () => {
    if (popUp) {
      setPopUp(false);
    } else {
      calculatePopupPosition();
      setPopUp(true);
    }
  };
  const fetchData = async () => {
    const docRef = doc(db, "mainPage", "v4l8MQfCrngh7T96EPQU");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data());
    } else {
      console.log("Документ не знайдено!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const calculatePopupPosition = () => {
    const buttonPosition = document
      .querySelector(".whoyIsOpRada")
      .getBoundingClientRect();
    const popupHeight = 250;
    setPopupPosition(buttonPosition.top);
    const element = document.querySelector(".musicWrapOp");
    let needHeight = popupPosition + scrollHeight;
    if (element) {
      element.style.top = scrollHeight;
    }
  };

  const handleApplyClick = () => {
    window.open(
      "https://docs.google.com/forms/d/18sZEW9Xpp5rWT661V_uNet7wkR61KNECOwKvao_MlwM/edit",
      "_blank"
    );
  };

  const handleClickOutside = (event) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target) &&
      !event.target.closest(".whoyIsOpRada")
    ) {
      setPopUp(false);
    }
  };

  useEffect(() => {
    if (popUp) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popUp]);

  return (
    <div className="newBooksWrapBlock">
      {data && (
        <div className="GreenBlockMal">
          <h1 className="HelpCreateBooks">{data.youCan}</h1>
          <p className="giveDiscount">{data.welcamDisc}</p>
          <h1 className="nameBooksNewBooksMal">{data.titleMalevich}</h1>
          <p className="descriptionOpikunBook">{data.descMalevich}</p>
          {popUp && (
            <PopUpRada
              popupPosition={popupPosition}
              scrollHeight={scrollHeight}
              ref={popupRef}
            />
          )}
          <button className="whoyIsOpRada" onClick={handleMouseEnter}>
            Що таке опікунська рада
          </button>
        </div>
      )}
      {data && (
        <div className="BorderWrapBlurOp">
          <div className="imgPictureBoxOpicun">
            <img
              src={data.pictureOp}
              className="opicunPicture"
              alt={`picture`}
            />
            <div className="markerSun">Скоро</div>
          </div>
          <button className="opRadaButton" onClick={handleApplyClick}>
            Подати заявку на участь в опікунській раді
          </button>

          <div className="OpradaRelPrice">
            <div className="OpradaRelPriceRotate">
              <h2 className="salePriceOpRada">{data.discount}%</h2>
              <p className="fullPriceOpRada">знижка</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
