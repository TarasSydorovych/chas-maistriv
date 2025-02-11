import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../../../firebase"; // Імпорт Firebase конфігурації
import css from "../adm.module.css"; // Заміна на ваш шлях до стилів

export default function LitShowManager() {
  const [texts, setTexts] = useState({
    block1Title: "",
    block1Desc: "",
    block2Title: "",
    block2Desc: "",
    block3Title: "",
    block3Desc1: "",
    block3Desc2: "",
    block3Desc3: "",
    block3Desc4: "",
    buttonOrderText1: "",
    buttonOrderLink1: "",
    buttonOrderText2: "",
    buttonOrderLink2: "",
    buttonOrderText3: "",
    buttonOrderLink3: "",
  });

  useEffect(() => {
    const loadData = async () => {
      const docRef = doc(db, "litShow", "showSettings");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTexts(docSnap.data());
      }
    };

    loadData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTexts((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, "litShow", "showSettings");

      await setDoc(docRef, texts, { merge: true });

      Swal.fire("Успіх!", "Усі зміни успішно збережено!", "success");
    } catch (error) {
      Swal.fire(
        "Помилка!",
        "Сталася помилка під час збереження змін.",
        "error"
      );
    }
  };

  return (
    <div className={css.pageOptionsManager}>
      <h2>Управління Літшоу</h2>

      {/* Блок 1 */}
      <div className={css.formGroup}>
        <label>Заголовок для 1-го блоку:</label>
        <input
          type="text"
          name="block1Title"
          value={texts.block1Title}
          onChange={handleInputChange}
        />
      </div>
      <div className={css.formGroup}>
        <label>Опис для 1-го блоку:</label>
        <input
          type="text"
          name="block1Desc"
          value={texts.block1Desc}
          onChange={handleInputChange}
        />
      </div>

      {/* Блок 2 */}
      <div className={css.formGroup}>
        <label>Заголовок для 2-го блоку:</label>
        <input
          type="text"
          name="block2Title"
          value={texts.block2Title}
          onChange={handleInputChange}
        />
      </div>
      <div className={css.formGroup}>
        <label>Опис для 2-го блоку:</label>
        <input
          type="text"
          name="block2Desc"
          value={texts.block2Desc}
          onChange={handleInputChange}
        />
      </div>

      {/* Блок 3 */}
      <div className={css.formGroup}>
        <label>Заголовок для 3-го блоку:</label>
        <input
          type="text"
          name="block3Title"
          value={texts.block3Title}
          onChange={handleInputChange}
        />
      </div>
      <div className={css.formGroup}>
        <label>Опис 1 для 3-го блоку:</label>
        <input
          type="text"
          name="block3Desc1"
          value={texts.block3Desc1}
          onChange={handleInputChange}
        />
      </div>
      <div className={css.formGroup}>
        <label>Опис 2 для 3-го блоку:</label>
        <input
          type="text"
          name="block3Desc2"
          value={texts.block3Desc2}
          onChange={handleInputChange}
        />
      </div>
      <div className={css.formGroup}>
        <label>Опис 3 для 3-го блоку:</label>
        <input
          type="text"
          name="block3Desc3"
          value={texts.block3Desc3}
          onChange={handleInputChange}
        />
      </div>
      <div className={css.formGroup}>
        <label>Опис 4 для 3-го блоку:</label>
        <input
          type="text"
          name="block3Desc4"
          value={texts.block3Desc4}
          onChange={handleInputChange}
        />
      </div>

      {/* Кнопки */}
      <div className={css.formGroup}>
        <label>Текст для 1-ї кнопки:</label>
        <input
          type="text"
          name="buttonOrderText1"
          value={texts.buttonOrderText1}
          onChange={handleInputChange}
        />
      </div>
      <div className={css.formGroup}>
        <label>Посилання для 1-ї кнопки:</label>
        <input
          type="text"
          name="buttonOrderLink1"
          value={texts.buttonOrderLink1}
          onChange={handleInputChange}
        />
      </div>

      <div className={css.formGroup}>
        <label>Текст для 2-ї кнопки:</label>
        <input
          type="text"
          name="buttonOrderText2"
          value={texts.buttonOrderText2}
          onChange={handleInputChange}
        />
      </div>
      <div className={css.formGroup}>
        <label>Посилання для 2-ї кнопки:</label>
        <input
          type="text"
          name="buttonOrderLink2"
          value={texts.buttonOrderLink2}
          onChange={handleInputChange}
        />
      </div>

      <div className={css.formGroup}>
        <label>Текст для 3-ї кнопки:</label>
        <input
          type="text"
          name="buttonOrderText3"
          value={texts.buttonOrderText3}
          onChange={handleInputChange}
        />
      </div>
      <div className={css.formGroup}>
        <label>Посилання для 3-ї кнопки:</label>
        <input
          type="text"
          name="buttonOrderLink3"
          value={texts.buttonOrderLink3}
          onChange={handleInputChange}
        />
      </div>

      <button onClick={handleSave} className={css.saveButton}>
        Зберегти зміни
      </button>
    </div>
  );
}
