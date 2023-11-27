import { useState, useEffect } from "react";
import axios from "axios";
export default function Get() {
  const sendPostRequest = async () => {
    try {
      const apiUrl = "http://localhost:4000/create-order"; // Замініть на відповідний URL свого сервера
      const requestData = {
        // Додайте дані, які ви хочете відправити на сервер
        source_id: 1,
        source_uuid: "115",
        // Додайте інші дані для замовлення
      };

      const response = await axios.post(apiUrl, requestData);

      // Отримання і обробка відповіді від сервера або CRM
      console.log("Успішна відповідь:", response.data);
    } catch (error) {
      // Обробка помилки
      console.error("Помилка:", error);
    }
  };
  return (
    <div>
      <h1>Список замовлень</h1>
      <button onClick={sendPostRequest}>відправити</button>
    </div>
  );
}
