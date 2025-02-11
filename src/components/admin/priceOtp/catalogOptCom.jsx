import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../../../firebase"; // Імпорт Firebase конфігурації
import css from "../adm.module.css"; // Заміна на ваш шлях до стилів

export default function CatalogOptCom() {
  const [electroText, setElectroText] = useState("");
  const [catalogText, setCatalogText] = useState("");
  const [deliveryText, setDeliveryText] = useState("");
  const [discountText, setDiscountText] = useState("");
  const [electroLink, setElectroLink] = useState("");
  const [catalogLink, setCatalogLink] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const docRef = doc(db, "pageOpt", "electroDocumentSettings");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setElectroText(data.electroText || "");
        setCatalogText(data.catalogText || "");
        setDeliveryText(data.deliveryText || "");
        setDiscountText(data.discountText || "");
        setElectroLink(data.electroLink || "");
        setCatalogLink(data.catalogLink || "");
      }
    };

    loadData();
  }, []);

  const handleSave = async () => {
    try {
      const docRef = doc(db, "pageOpt", "electroDocumentSettings");

      let updatedData = {
        electroText,
        catalogText,
        deliveryText,
        discountText,
        electroLink,
        catalogLink,
      };

      await setDoc(docRef, updatedData, { merge: true });

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
      <h2>Управління Електронним Документообігом</h2>
      <div className={css.formGroup}>
        <label>Текст для "Елетронний документообіг":</label>
        <input
          type="text"
          value={electroText}
          onChange={(e) => setElectroText(e.target.value)}
        />
      </div>
      <div className={css.formGroup}>
        <label>Текст для "Скачати каталог":</label>
        <input
          type="text"
          value={catalogText}
          onChange={(e) => setCatalogText(e.target.value)}
        />
      </div>
      <div className={css.formGroup}>
        <label>
          Текст для "Безоплатна доставка при замовлені від 3000 грн":
        </label>
        <input
          type="text"
          value={deliveryText}
          onChange={(e) => setDeliveryText(e.target.value)}
        />
      </div>
      <div className={css.formGroup}>
        <label>
          Текст для "40% знижки при щомісячному замовлені на умовах попередньої
          оплати":
        </label>
        <input
          type="text"
          value={discountText}
          onChange={(e) => setDiscountText(e.target.value)}
        />
      </div>
      <div className={css.formGroup}>
        <label>Посилання для "Елетронний документообіг":</label>
        <input
          type="text"
          value={electroLink}
          onChange={(e) => setElectroLink(e.target.value)}
        />
      </div>
      <div className={css.formGroup}>
        <label>Посилання для "Скачати каталог":</label>
        <input
          type="text"
          value={catalogLink}
          onChange={(e) => setCatalogLink(e.target.value)}
        />
      </div>
      <button onClick={handleSave} className={css.saveButton}>
        Зберегти зміни
      </button>
    </div>
  );
}
