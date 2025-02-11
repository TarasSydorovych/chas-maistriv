import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import { db } from "../../../firebase"; // Замініть шлях на ваш актуальний

import css from "../adm.module.css";

const OpicunskaRada = () => {
  const [data, setData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "mainPage", "v4l8MQfCrngh7T96EPQU");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
        setFormData(docSnap.data());
      } else {
        console.log("Документ не існує!");
      }
    };

    fetchData();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    Swal.fire({
      title: "Збереження...",
      text: "Будь ласка, зачекайте, поки ваші дані зберігаються.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    let pictureOpUrl = formData.pictureOp;

    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      pictureOpUrl = await getDownloadURL(storageRef);
    }

    const updatedData = {
      ...formData,
      pictureOp: pictureOpUrl,
    };

    const docRef = doc(db, "mainPage", "v4l8MQfCrngh7T96EPQU");
    await updateDoc(docRef, updatedData);

    Swal.close();
    Swal.fire("Збережено!", "Ваші зміни були успішно збережені.", "success");

    setData(updatedData);
    setEditMode(false);
  };

  if (!data) {
    return <div>Завантаження...</div>;
  }

  return (
    <div className={css.opRadaCh}>
      {editMode ? (
        <div className={css.wrapTeatAreaOpicun}>
          <textarea
            name="youCan"
            value={formData.youCan}
            onChange={handleChange}
            className={css.textarea}
          />
          <textarea
            name="welcamDisc"
            value={formData.welcamDisc}
            onChange={handleChange}
            className={css.textarea}
          />
          <textarea
            name="titleMalevich"
            value={formData.titleMalevich}
            onChange={handleChange}
            className={css.textarea}
          />
          <textarea
            name="descMalevich"
            value={formData.descMalevich}
            onChange={handleChange}
            className={css.textarea}
          />
          <textarea
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className={css.textarea}
          />
          <input
            type="file"
            onChange={handleFileChange}
            className={css.fileInput}
          />
          <button onClick={handleSave} className={css.saveButton}>
            Зберегти
          </button>
        </div>
      ) : (
        <div>
          <p>{data.youCan}</p>
          <p>{data.welcamDisc}</p>
          <p>{data.titleMalevich}</p>
          <p>{data.descMalevich}</p>
          <p>Знижка: {data.discount}</p>
          <img src={data.pictureOp} alt="Picture" className={css.image} />
          <button onClick={handleEdit} className={css.editButton}>
            Редагувати
          </button>
        </div>
      )}
    </div>
  );
};

export default OpicunskaRada;
