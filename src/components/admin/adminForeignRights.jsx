import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import css from "./adm.module.css";

const AdminForeignRights = () => {
  const [link, setLink] = useState(""); // Значення посилання
  const [loading, setLoading] = useState(true);
  const documentId = "uniqueForeignRight"; // Унікальний ID документа

  useEffect(() => {
    const fetchForeignRight = async () => {
      try {
        const docRef = doc(db, "foreignRights", documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setLink(docSnap.data().link || ""); // Встановити посилання з документа
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForeignRight();
  }, []);

  const handleSave = async () => {
    if (!link.trim()) {
      alert("Link cannot be empty.");
      return;
    }

    try {
      const docRef = doc(db, "foreignRights", documentId);
      await setDoc(docRef, { link }); // Оновлення документа
      alert("Link saved successfully!");
    } catch (error) {
      console.error("Error saving link:", error);
      alert("Failed to save the link. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={css.adminForeignRightsWrap}>
      <h2>Manage Foreign Right Link</h2>
      <div className={css.inputGroup}>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className={css.inputField}
          placeholder="Enter the link here"
        />
        <button onClick={handleSave} className={css.saveButton}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AdminForeignRights;
