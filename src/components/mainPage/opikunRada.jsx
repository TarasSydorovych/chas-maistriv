import pictureBook from "../../img/opicunBooK.png";
import PopUpRada from "../popUp/popUpRada";
import { useState } from "react";

export default function OpikunRada({ scrollHeight }) {
  const [popupPosition, setPopupPosition] = useState("");
  const [popUp, setPopUp] = useState(false);
  const handleMouseEnter = () => {
    calculatePopupPosition();
    setPopUp(!popUp);
  };
  const calculatePopupPosition = () => {
    // Отримайте позицію кнопки
    const buttonPosition = document
      .querySelector(".whoyIsOpRada")
      .getBoundingClientRect();

    // Отримайте розміри попапу
    const popupHeight = 250; // Задайте висоту попапу (можете змінити за необхідністю)
    setPopupPosition(buttonPosition.top);
    // Обчисліть вертикальну позицію попапу
    const topPosition = buttonPosition.top - popupHeight;
    const element = document.querySelector(".musicWrapOp");

    let needHeight = popupPosition + scrollHeight;
    if (element) {
      element.style.top = scrollHeight;
    }
  };

  return (
    <div className="newBooksWrapBlock">
      <div className="GreenBlockMal">
        <h1 className="HelpCreateBooks">
          Ти можеш допомогти нам створити книгу!
        </h1>

        <p className="giveDiscount">
          Запрошуємо прочитати рукопис залишити відгук і отримаєш 40% знижки на
          покупку будь якої книги
        </p>

        <h1 className="nameBooksNewBooksMal">Ти і Малевич</h1>
        <p className="descriptionOpikunBook">
          «Ти і Малевич» — це книжка-альбом із творчими завданнями, наліпками,
          розмальовками, яка дитині 5–13 років дає можливість уявити себе учнем
          чи ученицею Казимира Малевича. Кожен розгорт книжки присвячено одній
          із головних ідей художника, що спонукає не тільки читати й пізнавати,
          а й самостійно створити свою версію «Чорного квадрата», супрематичну
          композицію, проєкт планіту для земляніта, відкрити першоелементи,
          безпредметність та зрозуміти персонажів картин Малевича, розмалювавши
          їх по-своєму.
        </p>
        {popUp && (
          <PopUpRada
            popupPosition={popupPosition}
            scrollHeight={scrollHeight}
          />
        )}
        <button className="whoyIsOpRada" onClick={handleMouseEnter}>
          Що таке опікунська рада
        </button>
      </div>

      <div className="BorderWrapBlurOp">
        <div className="imgPictureBox">
          <img src={pictureBook} className="opicunPicture" alt={`picture`} />
          <div className="markerSun">Скоро</div>
        </div>
        <button className="opRadaButton">
          Подати заявку на участь в опікунській раді
        </button>

        <div className="OpradaRelPrice">
          <div className="OpradaRelPriceRotate">
            <h2 className="salePriceOpRada">40%</h2>
            <p className="fullPriceOpRada">знижка</p>
          </div>
        </div>
      </div>
    </div>
  );
}
