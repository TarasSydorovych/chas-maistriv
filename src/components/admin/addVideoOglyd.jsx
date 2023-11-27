import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; // Імпорт необхідних методів для роботи з Firebase версії 9
import { db } from "../../firebase";
const AddVideoOglyd = () => {
  // Передайте додатково об'єкт бази даних Firebase через props

  const [videoData, setVideoData] = useState({
    videoName: "",
    videoDesc: "",
    ageCategory: "",
    videoId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoData({ ...videoData, [name]: value });
  };

  const handleUpload = async () => {
    try {
      // Додайте дані до колекції `videoV` в Firebase
      const docRef = await addDoc(collection(db, "videoV"), videoData);
      console.log("Дані успішно додані до Firebase:", docRef.id);
      // Очистіть поля вводу
      setVideoData({
        videoName: "",
        videoDesc: "",
        ageCategory: "",
        videoId: "",
      });
    } catch (error) {
      console.error("Помилка при додаванні даних до Firebase:", error);
    }
  };

  return (
    <div>
      <h2>Завантажити відео</h2>
      <div>
        <label htmlFor="videoName">Назва відео:</label>
        <input
          type="text"
          id="videoName"
          name="videoName"
          value={videoData.videoName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="videoDesc">Опис відео:</label>
        <textarea
          id="videoDesc"
          name="videoDesc"
          value={videoData.videoDesc}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="ageCategory">Вікова категорія:</label>
        <input
          type="text"
          id="ageCategory"
          name="ageCategory"
          value={videoData.ageCategory}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="videoId">ID відео:</label>
        <input
          type="text"
          id="videoId"
          name="videoId"
          value={videoData.videoId}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleUpload}>Завантажити відео</button>
    </div>
  );
};

export default AddVideoOglyd;
