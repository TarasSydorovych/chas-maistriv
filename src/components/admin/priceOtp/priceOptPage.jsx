import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../../../firebase"; // Імпорт Firebase конфігурації
import css from "../adm.module.css"; // Заміна на ваш шлях до стилів

export default function PriceOptPage() {
  const [joinLink, setJoinLink] = useState("");
  const [detailsLink, setDetailsLink] = useState("");
  const [saleNewOneUrl, setSaleNewOneUrl] = useState("");
  const [saleNewTwoUrl, setSaleNewTwoUrl] = useState("");
  const [saleThreBlockUrl, setSaleThreBlockUrl] = useState("");
  const [rotatePicUrl, setRotatePicUrl] = useState("");
  const [notRotatePicUrl, setNotRotatePicUrl] = useState("");

  const [saleNewOne, setSaleNewOne] = useState(null);
  const [saleNewTwo, setSaleNewTwo] = useState(null);
  const [saleThreBlock, setSaleThreBlock] = useState(null);
  const [rotatePic, setRotatePic] = useState(null);
  const [notRotatePic, setNotRotatePic] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const docRef = doc(db, "pageOpt", "pageSettings");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setJoinLink(data.joinLink || "");
        setDetailsLink(data.detailsLink || "");
        setSaleNewOneUrl(data.saleNewOneUrl || "");
        setSaleNewTwoUrl(data.saleNewTwoUrl || "");
        setSaleThreBlockUrl(data.saleThreBlockUrl || "");
        setRotatePicUrl(data.rotatePicUrl || "");
        setNotRotatePicUrl(data.notRotatePicUrl || "");
      }
    };

    loadData();
  }, []);

  const handleFileUpload = (file, storagePath) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(getStorage(), storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      Swal.fire({
        title: "Завантаження...",
        html: "Прогрес: <b></b>%",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              Swal.getHtmlContainer().querySelector("b").textContent =
                Math.floor(progress);
            },
            (error) => {
              console.log("Помилка під час завантаження:", error);
              Swal.fire(
                "Помилка!",
                "Помилка під час завантаження фото.",
                "error"
              );
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              Swal.fire("Успіх!", "Файл успішно завантажено!", "success");
              resolve(downloadURL);
            }
          );
        },
      });
    });
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, "pageOpt", "pageSettings");

      let updatedData = {
        joinLink,
        detailsLink,
        saleNewOneUrl,
        saleNewTwoUrl,
        saleThreBlockUrl,
        rotatePicUrl,
        notRotatePicUrl,
      };

      if (saleNewOne) {
        const newSaleNewOneUrl = await handleFileUpload(
          saleNewOne,
          `images/saleNewOne`
        );
        updatedData.saleNewOneUrl = newSaleNewOneUrl;
      }
      if (saleNewTwo) {
        const newSaleNewTwoUrl = await handleFileUpload(
          saleNewTwo,
          `images/saleNewTwo`
        );
        updatedData.saleNewTwoUrl = newSaleNewTwoUrl;
      }
      if (saleThreBlock) {
        const newSaleThreBlockUrl = await handleFileUpload(
          saleThreBlock,
          `images/saleThreBlock`
        );
        updatedData.saleThreBlockUrl = newSaleThreBlockUrl;
      }
      if (rotatePic) {
        const newRotatePicUrl = await handleFileUpload(
          rotatePic,
          `images/rotatePic`
        );
        updatedData.rotatePicUrl = newRotatePicUrl;
      }
      if (notRotatePic) {
        const newNotRotatePicUrl = await handleFileUpload(
          notRotatePic,
          `images/notRotatePic`
        );
        updatedData.notRotatePicUrl = newNotRotatePicUrl;
      }

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
      <h2>Управління опціями сторінки</h2>
      <div className={css.formGroup}>
        <label>Посилання для кнопки "Приєднатися":</label>
        <input
          type="text"
          value={joinLink}
          onChange={(e) => setJoinLink(e.target.value)}
        />
      </div>
      <div className={css.formGroup}>
        <label>Посилання для кнопки "Детальніше":</label>
        <input
          type="text"
          value={detailsLink}
          onChange={(e) => setDetailsLink(e.target.value)}
        />
      </div>
      <div className={css.formGroup}>
        <label>Зображення "Акція до Нового року":</label>
        {saleNewOneUrl && (
          <img src={saleNewOneUrl} alt="Акція до Нового року" />
        )}
        <input type="file" onChange={(e) => setSaleNewOne(e.target.files[0])} />
      </div>
      <div className={css.formGroup}>
        <label>Зображення "Знижка на товар":</label>
        {saleNewTwoUrl && <img src={saleNewTwoUrl} alt="Знижка на товар" />}
        <input type="file" onChange={(e) => setSaleNewTwo(e.target.files[0])} />
      </div>
      <div className={css.formGroup}>
        <label>Зображення "Третій блок":</label>
        {saleThreBlockUrl && <img src={saleThreBlockUrl} alt="Третій блок" />}
        <input
          type="file"
          onChange={(e) => setSaleThreBlock(e.target.files[0])}
        />
      </div>
      <div className={css.formGroup}>
        <label>Зображення "Зображення з обертанням":</label>
        {rotatePicUrl && (
          <img src={rotatePicUrl} alt="Зображення з обертанням" />
        )}
        <input type="file" onChange={(e) => setRotatePic(e.target.files[0])} />
      </div>
      <div className={css.formGroup}>
        <label>Зображення "Статичне зображення":</label>
        {notRotatePicUrl && (
          <img src={notRotatePicUrl} alt="Статичне зображення" />
        )}
        <input
          type="file"
          onChange={(e) => setNotRotatePic(e.target.files[0])}
        />
      </div>
      <button onClick={handleSave} className={css.saveButton}>
        Зберегти зміни
      </button>
    </div>
  );
}
