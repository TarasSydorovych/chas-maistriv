import { useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db } from "../../firebase";
import Swal from "sweetalert2";
const SurveyForm = () => {
  const storage = getStorage();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([
    { id: "option1", text: "", score: 0 },
    { id: "option2", text: "", score: 0 },
    { id: "option3", text: "", score: 0 },
    { id: "option4", text: "", score: 0 },
  ]);
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleOptionChange = (e, index) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = e.target.value;
    setOptions(updatedOptions);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageURL = null;

      // Завантаження фотографії до Firebase Storage
      if (image) {
        const storageRef = ref(storage, `surveyImages/${image.name}`);
        await uploadBytes(storageRef, image);
        imageURL = await getDownloadURL(storageRef);
      }

      const surveyData = {
        title,
        description,
        options,
        imageURL,
        data: serverTimestamp(),
      };

      // Додавання опитування до колекції "surveys" у Firebase
      const docRef = await addDoc(collection(db, "surveys"), surveyData);
      Swal.fire({
        title: "Успішно",
        text: "Опитування успішно додане",
        icon: "success",
        confirmButtonText: "OK",
      });
      console.log("Опитування успішно додано. ID документа:", docRef.id);
    } catch (error) {
      console.error("Помилка при додаванні опитування:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Заголовок опитування:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Опис опитування:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div>
        <label>Варіанти відповідей:</label>
        {options.map((option, index) => (
          <input
            key={option.id}
            type="text"
            value={option.text}
            onChange={(e) => handleOptionChange(e, index)}
          />
        ))}
      </div>
      <div>
        <label htmlFor="image">Фото:</label>
        <input type="file" id="image" onChange={handleImageChange} />
      </div>
      <button type="submit">Зберегти опитування</button>
    </form>
  );
};

export default SurveyForm;
