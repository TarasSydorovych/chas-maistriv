import { useEffect, useState } from "react";
import { db } from "../../firebase"; // Firebase конфігурація
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import css from "./adm.module.css";

export default function AdminAboutAuth() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "aboutAuthContent", "mainPageTexts");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContent(docSnap.data()); // Якщо документ існує
      } else {
        alert("Документ не існує! Буде створено новий документ.");
        setContent({
          section1_intro: "",
          section1_general: "",
          section1_desc: "",
          section1_offer: "",
          section2_intronew: "",
          section2_intro: "",
          section2_post: "",
          section2_general: "",
          section2_desc: "",
        });
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const docRef = doc(db, "aboutAuthContent", "mainPageTexts");
    try {
      // Якщо документ існує, оновити; якщо ні, створити новий
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, content);
      } else {
        await setDoc(docRef, content);
      }
      alert("Збережено успішно!");
    } catch (error) {
      console.error("Помилка при збереженні документа: ", error);
      alert("Помилка збереження. Перевірте консоль для деталей.");
    }
  };

  if (loading) return <div>Завантаження...</div>;

  return (
    <div>
      <h1>Редагування текстів AboutAuth</h1>
      <form>
        {/* Поля для авторів */}
        <div style={{ marginBottom: "20px" }}>
          <h3>Вступ для авторів</h3>
          <ReactQuill
            className={css.quilForAutorAnd}
            theme="snow"
            value={content.section1_intro || ""}
            onChange={(value) => handleChange("section1_intro", value)}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Загальне звернення до автора</h3>
          <ReactQuill
            className={css.quilForAutorAnd}
            theme="snow"
            value={content.section1_general || ""}
            onChange={(value) => handleChange("section1_general", value)}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Опис для авторів</h3>
          <ReactQuill
            className={css.quilForAutorAnd}
            theme="snow"
            value={content.section1_desc || ""}
            onChange={(value) => handleChange("section1_desc", value)}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Оферта</h3>
          <ReactQuill
            className={css.quilForAutorAnd}
            theme="snow"
            value={content.section1_offer || ""}
            onChange={(value) => handleChange("section1_offer", value)}
          />
        </div>

        {/* Нове поле */}
        <div style={{ marginBottom: "20px" }}>
          <h3>Повага</h3>
          <ReactQuill
            className={css.quilForAutorAnd}
            theme="snow"
            value={content.section2_intronew || ""}
            onChange={(value) => handleChange("section2_intronew", value)}
          />
        </div>

        {/* Поля для художників */}
        <div style={{ marginBottom: "20px" }}>
          <h3>Вступ для художників</h3>
          <ReactQuill
            className={css.quilForAutorAnd}
            theme="snow"
            value={content.section2_intro || ""}
            onChange={(value) => handleChange("section2_intro", value)}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Email для художників</h3>
          <ReactQuill
            className={css.quilForAutorAnd}
            theme="snow"
            value={content.section2_post || ""}
            onChange={(value) => handleChange("section2_post", value)}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Загальне звернення до художників</h3>
          <ReactQuill
            className={css.quilForAutorAnd}
            theme="snow"
            value={content.section2_general || ""}
            onChange={(value) => handleChange("section2_general", value)}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Опис для художників</h3>
          <ReactQuill
            className={css.quilForAutorAnd}
            theme="snow"
            value={content.section2_desc || ""}
            onChange={(value) => handleChange("section2_desc", value)}
          />
        </div>

        {/* Кнопка збереження */}
        <button type="button" onClick={handleSave}>
          Зберегти зміни
        </button>
      </form>
    </div>
  );
}
