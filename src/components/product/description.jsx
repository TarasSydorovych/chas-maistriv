import iconDownload from "../../img/downloadIcon.png";
import css from "./product.module.css";

export default function Description({ oneProd }) {
  return (
    <div className={css.descriptionWrapp}>
      <div className={css.realDescWrapp}>
        <div className={css.pidWrap}>
          <div className={css.defLine}></div>
          <p className={css.descP}>Вік: {oneProd.yearGroupFor.join(" / ")}</p>
          <p className={css.descP}>Мова: {oneProd.bookLanguage}</p>
          {/* <p className={css.descP}>Жанр: {oneProd.ganr}</p>
          <p className={css.descP}>Призначення: {oneProd.forWho}</p> */}
          <p className={css.descP}>
            Жанр:{" "}
            {oneProd &&
              oneProd.ganr &&
              (Array.isArray(oneProd.ganr) ? (
                oneProd.ganr.map((item, index) => (
                  <span key={index}>
                    {item}
                    {index < oneProd.ganr.length - 1 && " / "}
                  </span>
                ))
              ) : (
                <span>{oneProd.ganr}</span>
              ))}
          </p>

          <p className={css.descP}>
            Призначення:{" "}
            {/* {oneProd.forWho.map((item, index) => (
              <span key={index}>
                {item}
                {index < oneProd.forWho.length - 1 && " / "}
              </span>
            ))} */}
            {Array.isArray(oneProd.forWho) ? (
              oneProd.forWho.map((item, index) => (
                <span key={index}>
                  {item}
                  {index < oneProd.forWho.length - 1 && " / "}
                </span>
              ))
            ) : (
              <span>{oneProd.forWho}</span>
            )}
          </p>
          <p className={css.descP}>
            Фізичні характеристики: {oneProd.priceMas} / {oneProd.pageCount} стр
            / {oneProd.bookFormat} мм / {oneProd.ilystracii} /{" "}
            {oneProd.booksWei} гр / {oneProd.bookLanguage} / дизайн{" "}
            {oneProd.bDesign}
          </p>
        </div>
      </div>
      {/* <div className={css.downloadIcon}>
        <div className={css.iconDownload}>
          <img src={iconDownload} />
        </div>
      </div> */}
    </div>
  );
}
