import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase"; // імпортуйте налаштований екземпляр Firestore

const NovaPoshtaKeyManager = () => {
  // Стан для зберігання значення ключа, завантаження та повідомлень
  const [keyValue, setKeyValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Вкажіть ідентифікатор документа, де зберігається ключ (наприклад, "novaPoshtaData")
  const docRef = doc(db, "novapost", "novaPoshtaData");

  // Функція для завантаження існуючого ключа з Firestore
  const fetchKey = async () => {
    setLoading(true);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setKeyValue(data.key || "");
      } else {
        setMessage("Документ не існує, при збереженні буде створено новий.");
      }
    } catch (error) {
      console.error("Помилка завантаження ключа:", error);
      setMessage("Помилка завантаження даних.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchKey();
  }, []);

  // Обробка зміни значення інпуту
  const handleChange = (e) => {
    setKeyValue(e.target.value);
  };

  // Функція для збереження ключа (додавання або оновлення)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Використовуємо setDoc з merge: true для додавання/оновлення поля key
      await setDoc(docRef, { key: keyValue }, { merge: true });
      setMessage("Ключ успішно збережено!");
    } catch (error) {
      console.error("Помилка збереження ключа:", error);
      setMessage("Помилка збереження ключа.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <h2>Керування ключем Нової Пошти</h2>
      {loading && <p>Завантаження...</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="novaPoshtaKey"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Ключ Нової Пошти:
          </label>
          <input
            type="text"
            id="novaPoshtaKey"
            value={keyValue}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ padding: "0.5rem 1rem" }}
        >
          Зберегти
        </button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
};

export default NovaPoshtaKeyManager;
