import React, { useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

const CopyFiltersToManuscript = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCopyFilters = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Перевірка, чи є вже записи у колекції 'filtersManuscript'
      const manuscriptSnapshot = await getDocs(
        collection(db, "filtersManuscript")
      );
      if (!manuscriptSnapshot.empty) {
        console.log("Фільтри вже були скопійовані.");
        setLoading(false);
        setSuccess(true);
        return;
      }

      // Отримуємо всі документи з колекції 'filters'
      const querySnapshot = await getDocs(collection(db, "filters"));

      // Копіюємо кожен документ у нову колекцію 'filtersManuscript'
      querySnapshot.forEach(async (doc) => {
        const data = doc.data();
        await addDoc(collection(db, "filtersManuscript"), data);
      });

      setSuccess(true);
    } catch (err) {
      console.error("Error copying filters: ", err);
      setError("Помилка при копіюванні фільтрів.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleCopyFilters} disabled={loading}>
        {loading ? "Копіювання..." : "Копіювати фільтри"}
      </button>
      {error && <p>{error}</p>}
      {success && <p>Фільтри успішно скопійовані!</p>}
    </div>
  );
};

export default CopyFiltersToManuscript;
