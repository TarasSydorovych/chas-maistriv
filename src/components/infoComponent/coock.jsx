import css from "./info.module.css";

export default function Coock({ setCoock }) {
  const handleAccept = () => {
    localStorage.setItem("cookie", "true");
    setCoock(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie", "false");
    setCoock(false);
  };

  return (
    <div className={css.coockWrap}>
      <p className={css.coockieP}>
        Ми просимо вашого схвалення. Ми розмістили файли cookie на нашому
        вебсайті, щоб забезпечити вам найкращу функціональність. Вони є технічно
        та функціонально необхідними.
      </p>
      <div className={css.buttonCoockieWrap}>
        <button onClick={handleAccept} className={css.firstButtonCoocki}>
          Прийняти
        </button>
        <button onClick={handleReject} className={css.secondButtonCoocki}>
          Відхилити
        </button>
      </div>
    </div>
  );
}
