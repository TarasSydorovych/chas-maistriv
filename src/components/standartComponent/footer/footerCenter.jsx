import { Link } from "react-router-dom";
import { useState } from "react";
import PopCH from "../../popUp/popCM";
import PopSp from "../../popUp/popSP";
import PopUpDrop from "../../popUp/popUpDrop";
import PopUpLibr from "../../popUp/popUpLibr";
import PopUpSuport from "../../popUp/popUpSuport";

export default function FooterCenter({ scrollHeight }) {
  const [popupPosition, setPopupPosition] = useState("");

  const [popUp, setPopUp] = useState(false);
  const handleMouseEnter = () => {
    setPopUp(true);
  };

  const handleMouseLeave = () => {
    setPopUp(false);
  };
  const [popUpKlas, setPopUpKlas] = useState(false);
  const handleMouseEnterKlas = () => {
    setPopUpKlas(true);
  };

  const handleMouseLeaveKlas = () => {
    setPopUpKlas(false);
  };
  const [popUpDrop, setPopUpDrop] = useState(false);
  const dropFunc = () => {
    setPopUpDrop(!popUpDrop);
  };
  const [popUpLibr, setPopUpLibr] = useState(false);
  const handleMouseEnterLibr = () => {
    setPopUpLibr(true);
  };

  const handleMouseLeaveLibr = () => {
    setPopUpLibr(false);
  };
  const [popUpSuport, setPopUpSuport] = useState(false);
  const handleMouseEnterSuport = () => {
    setPopUpSuport(true);
  };

  const handleMouseLeaveSuport = () => {
    setPopUpSuport(false);
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
    <div className="footerWrapperCenter">
      <div className="wrapCenterFirst">
        <ul className="centerFirstUlF">
          <li className="centerFirstLi">
            <Link to="/about" className="centerFirstLi">
              Про видавництво
            </Link>{" "}
          </li>
          <li className="centerFirstLi">
            <Link to="/about" className="centerFirstLi">
              Контакти
            </Link>
          </li>
          <li className="centerFirstLi">
            <Link to="/delivery" className="centerFirstLi">
              Доставка
            </Link>
          </li>
          <li className="centerFirstLi">
            <Link to="/delivery" className="centerFirstLi">
              Самовивіз
            </Link>
          </li>
          <li
            className="centerFirstLi"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Клуб Майстрів
          </li>
          {popUp && <PopCH />}
        </ul>
        <ul className="centerFirstUlS">
          <li className="centerFirstLi">
            <Link to="/delivery" className="centerFirstLi">
              Де пощупати наші книги
            </Link>
          </li>
          <li className="centerFirstLi">
            <Link to="/publicOffer" className="centerFirstLi">
              Публічна оферта
            </Link>
          </li>
          <li className="centerFirstLi">
            <Link to="/delivery" className="centerFirstLi">
              Книги ЧМ на АМАЗОН
            </Link>
          </li>
          <li className="centerFirstLi">
            <a
              className="centerFirstLi"
              target="_blanck"
              href="https://www.facebook.com/baarnabus/shop/%D0%A7%D0%B0%D1%81-%D0%9C%D0%B0%D0%B9%D1%81%D1%82%D1%80%D1%96%D0%B2-1193846147677425/?ref_code=mini_shop_profile_plus_shop_tab_cta&ref_surface=mini_shop_storefront"
            >
              {" "}
              Книги ЧМ в Європі
            </a>
          </li>
        </ul>
      </div>
      <div className="wrapCenterSecond">
        <ul className="centerSecondUlSF">
          <li className="centerSecondLi">
            <Link
              className="centerSecondLi"
              to="mailto:zoryana@chasmaistriv.com.ua"
            >
              Ви хочете стати нашим партнером, замовте договір
            </Link>
          </li>
          <li className="centerSecondLi">
            <Link to="/opt" className="centerSecondLi">
              Гуртове замовлення робити зручно
            </Link>
          </li>
          <li
            className="centerSecondLi"
            onMouseEnter={handleMouseEnterKlas}
            onMouseLeave={handleMouseLeaveKlas}
          >
            СП/ Корпоротивні/ на групу/ на клас
          </li>
          {popUpKlas && <PopSp />}
        </ul>

        <ul className="centerSecondUlS">
          <li className="centerSecondLi" onClick={dropFunc}>
            Дропшипінг
          </li>
          <li className="centerSecondLi">
            <a
              className="centerSecondLi"
              href="https://drive.google.com/file/d/1oeD2FqWAzfLlQcIMIm7hPtSHOs2br-Dv/view?usp=sharing"
              target="_blanck"
            >
              Завантажити каталог
            </a>
          </li>
          <li className="centerSecondLi">
            <a
              className="centerSecondLi"
              href="https://docs.google.com/spreadsheets/d/1K4ZJJXsdFtRWL5a14AtTMyWe-YMpnsxTXOJjLO8YHIw/edit#gid=1616448480"
              target="_blanck"
            >
              Завантажити прайс
            </a>
          </li>
          <li
            className="centerSecondLi"
            onMouseEnter={handleMouseEnterLibr}
            onMouseLeave={handleMouseLeaveLibr}
          >
            Підтримка бібліотек і бібліотекарів
          </li>
          <li
            className="centerSecondLi"
            onMouseEnter={handleMouseEnterSuport}
            onMouseLeave={handleMouseLeaveSuport}
          >
            Підтримка продавців-консультантів
          </li>
          {popUpDrop && <PopUpDrop />}
          {popUpLibr && <PopUpLibr />}
          {popUpSuport && <PopUpSuport />}
        </ul>
      </div>
    </div>
  );
}
