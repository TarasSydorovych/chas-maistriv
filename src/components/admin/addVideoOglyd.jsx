// import React, { useState } from "react";
// import { collection, addDoc } from "firebase/firestore"; // Імпорт необхідних методів для роботи з Firebase версії 9
// import { db } from "../../firebase";
// const AddVideoOglyd = () => {
//   // Передайте додатково об'єкт бази даних Firebase через props

//   const [videoData, setVideoData] = useState({
//     videoName: "",
//     videoDesc: "",
//     ageCategory: "",
//     videoId: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setVideoData({ ...videoData, [name]: value });
//   };

//   const handleUpload = async () => {
//     try {
//       // Додайте дані до колекції `videoV` в Firebase
//       const docRef = await addDoc(collection(db, "videoV"), videoData);
//       console.log("Дані успішно додані до Firebase:", docRef.id);
//       // Очистіть поля вводу
//       setVideoData({
//         videoName: "",
//         videoDesc: "",
//         ageCategory: "",
//         videoId: "",
//       });
//     } catch (error) {
//       console.error("Помилка при додаванні даних до Firebase:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Завантажити відео</h2>
//       <div>
//         <label htmlFor="videoName">Назва відео:</label>
//         <input
//           type="text"
//           id="videoName"
//           name="videoName"
//           value={videoData.videoName}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="videoDesc">Опис відео:</label>
//         <textarea
//           id="videoDesc"
//           name="videoDesc"
//           value={videoData.videoDesc}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="ageCategory">Вікова категорія:</label>
//         <input
//           type="text"
//           id="ageCategory"
//           name="ageCategory"
//           value={videoData.ageCategory}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="videoId">ID відео:</label>
//         <input
//           type="text"
//           id="videoId"
//           name="videoId"
//           value={videoData.videoId}
//           onChange={handleInputChange}
//         />
//       </div>
//       <button onClick={handleUpload}>Завантажити відео</button>
//     </div>
//   );
// };

// export default AddVideoOglyd;
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Swal from "sweetalert2"; // Імпорт SweetAlert2

const AddVideoOglyd = () => {
  const [videoData, setVideoData] = useState({
    videoName: "",
    videoDesc: "",
    ageCategory: "",
    videoId: "",
    book_uid: "", // Додайте поле для UID книги
    bookName: "", // Додайте поле для назви книги
  });

  const [books, setBooks] = useState([]); // Стейт для збереження списку книг

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = await getDocs(collection(db, "product"));
      const booksList = booksCollection.docs.map((doc) => ({
        uid: doc.id, // UID книги
        ...doc.data(), // Інші дані книги
      }));
      setBooks(booksList);
    };

    fetchBooks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoData({ ...videoData, [name]: value });
  };

  const handleUpload = async () => {
    // Валідація введених даних
    if (!videoData.videoName || !videoData.videoDesc) {
      Swal.fire({
        icon: "error",
        title: "Помилка",
        text: "Назва відео та опис є обов'язковими для заповнення!",
      });
      return;
    }

    try {
      // Додайте дані до колекції `videoV` в Firebase
      const docRef = await addDoc(collection(db, "videoV"), videoData);
      console.log("Дані успішно додані до Firebase:", docRef.id);

      // Показ повідомлення про успішне додавання
      Swal.fire({
        icon: "success",
        title: "Успішно",
        text: "Відео успішно додано!",
      });

      // Очистіть поля вводу
      setVideoData({
        videoName: "",
        videoDesc: "",
        ageCategory: "",
        videoId: "",
        book_uid: "",
        bookName: "",
      });
    } catch (error) {
      console.error("Помилка при додаванні даних до Firebase:", error);

      // Показ повідомлення про помилку
      Swal.fire({
        icon: "error",
        title: "Помилка",
        text: "Сталася помилка при додаванні відео. Спробуйте ще раз.",
      });
    }
  };

  const handleBookChange = (e) => {
    const selectedBook = books.find((book) => book.uid === e.target.value);
    setVideoData({
      ...videoData,
      book_uid: selectedBook.uid,
      bookName: selectedBook.bookName, // Припускаючи, що `bookName` є полем у даних книги
    });
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
      <div>
        <label htmlFor="bookSelect">Виберіть книгу:</label>
        <select id="bookSelect" onChange={handleBookChange}>
          <option value="">Оберіть книгу</option>
          {books.map((book) => (
            <option key={book.uid} value={book.uid}>
              {book.bookName}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleUpload}>Завантажити відео</button>
    </div>
  );
};

export default AddVideoOglyd;
